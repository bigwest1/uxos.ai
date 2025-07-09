#!/usr/bin/env node
/**
 * CLI: Summarize old messages in a conversation and upsert into MemorySummary.
 * Usage: node scripts/summarizeConversation.js <conversationId>
 */
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const [_, __, convoIdArg] = process.argv;
if (!convoIdArg) {
  console.error('Usage: summarizeConversation.js <conversationId>');
  process.exit(1);
}
const conversationId = parseInt(convoIdArg, 10);
if (isNaN(conversationId)) {
  console.error('Invalid conversationId:', convoIdArg);
  process.exit(1);
}

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarize() {
  const msgs = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });
  const content = msgs.map((m) => `${m.role}: ${m.content}`).join('\n');
  const prompt = [
    { role: 'system', content: 'Summarize the following conversation into concise bullet points:' },
    { role: 'user', content },
  ];
  const resp = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages: prompt });
  const summary = resp.choices?.[0]?.message?.content || '';
  await prisma.memorySummary.upsert({
    where: { conversationId },
    create: { conversationId, summary },
    update: { summary },
  });
  console.log('Summarized conversation', conversationId);
}

summarize()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
