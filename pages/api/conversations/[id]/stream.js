import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import { getAbTestStats } from '../../../../helpers/abTestService';
import { callAppropriateModel } from '../../../../lib/llmRouter';
import { withMetrics } from '../../../../lib/observability';
import { rateLimit } from '../../../../lib/rateLimiter';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).end('Unauthorized');
  // rate limit per user: max 60 requests per minute
  try {
    await rateLimit(`user:${userId}`, 60, 60);
  } catch (err) {
    return res.status(err.status || 429).end(err.message);
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).end('Invalid conversation id');

  const convo = await prisma.conversation.findUnique({
    where: { id: Number(id) },
    include: { messages: true },
  });
  if (!convo) return res.status(404).end('Conversation not found');

  // Prepare messages for prompting, with optional contextual embeddings
  const promptMessages = convo.messages.map((m) => ({ role: m.role, content: m.content }));
  // Semantic retrieval from local Prisma embeddings
  const embs = await prisma.messageEmbedding.findMany({
    where: { conversationId: Number(id) },
    include: { message: true },
  });
  if (embs.length) {
    const lastEmb = embs[embs.length - 1].embedding;
    function cosine(a, b) {
      const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
      const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
      return dot / (magA * magB);
    }
    const scored = embs
      .map((e) => ({ text: e.message.content, score: cosine(e.embedding, lastEmb) }))
      .sort((a, b) => b.score - a.score)
      .slice(1, 4)
      .map((e) => e.text);
    promptMessages.unshift({ role: 'system', content: 'Relevant context:\n' + scored.join('\n') });
  }

  // SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Choose model dynamically: heavier history uses fallback to control cost
  const model = convo.messages.length > 20
    ? process.env.OPENAI_FALLBACK_MODEL || 'gpt-3.5-turbo'
    : process.env.OPENAI_PRIMARY_MODEL || 'gpt-4';
  const functions = [
    {
      name: 'get_ab_test_stats',
      description: 'Retrieve live A/B test performance metrics',
      parameters: {
        type: 'object',
        properties: { testId: { type: 'string' } },
        required: ['testId'],
      },
    },
  ];
  const stream = await withMetrics(() => callAppropriateModel(promptMessages, {
    stream: true,
    model,
    functions,
    function_call: 'auto',
  }));
  for await (const chunk of stream) {
    const d0 = chunk.choices?.[0];
    if (d0?.delta?.function_call) {
      const { name, arguments: args } = d0.delta.function_call;
      const callArgs = JSON.parse(args || '{}');
      if (name === 'get_ab_test_stats') {
        const stats = await getAbTestStats(callArgs.testId);
        // Inline function result and continue streaming
        const followStream = await withMetrics(() => openai.chat.completions.create({
          model,
          messages: [
            ...promptMessages,
            { role: 'function', name, content: JSON.stringify(stats) },
          ],
          stream: true,
        }));
        for await (const fchunk of followStream) {
          const fdelta = fchunk.choices?.[0]?.delta?.content;
          if (fdelta) res.write(`data: ${JSON.stringify({ delta: fdelta })}\n\n`);
        }
      }
    }
    const delta = d0?.delta?.content;
    if (delta) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
  }
  res.write('event: done\ndata: {}\n\n');
  res.end();
}
