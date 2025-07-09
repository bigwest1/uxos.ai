import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Cron endpoint to summarize old conversations in bulk.
 * POST /api/cron/summarize
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const convos = await prisma.conversation.findMany({
    where: { messages: { some: { createdAt: { lt: cutoff } } } },
  });
  let count = 0;
  for (const convo of convos) {
    const msgs = await prisma.message.findMany({
      where: { conversationId: convo.id },
      orderBy: { createdAt: 'asc' },
    });
    const content = msgs.map((m) => `${m.role}: ${m.content}`).join('\n');
    const resp = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize the following conversation into bullet points:' },
        { role: 'user', content },
      ],
    });
    const summary = resp.choices?.[0]?.message?.content || '';
    await prisma.memorySummary.upsert({
      where: { conversationId: convo.id },
      create: { conversationId: convo.id, summary },
      update: { summary },
    });
    count++;
  }
  res.json({ summarized: count });
}
