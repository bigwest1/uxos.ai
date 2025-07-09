import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid conversation id' });

  if (req.method === 'GET') {
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(id) },
      include: { messages: true },
    });
    return res.status(200).json(conversation);
  }

  if (req.method === 'POST') {
    const { role, content } = req.body;
    // save user message
    const message = await prisma.message.create({
      data: { conversationId: Number(id), role, content },
    });
    // Compute and store embedding for user and assistant messages
    const toEmbed = content;
    const embedRes = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
      input: toEmbed,
    });
    const embedding = embedRes.data?.[0]?.embedding;
    if (embedding) {
      // Store embedding locally in Prisma (MySQL on PlanetScale)
      await prisma.messageEmbedding.create({
        data: { conversationId: Number(id), messageId: message.id, embedding },
      });
    }

    // fetch all messages for context
    const convo = await prisma.conversation.findUnique({
      where: { id: Number(id) },
      include: { messages: true },
    });
    const msgs = convo.messages.map((m) => ({ role: m.role, content: m.content }));

    // call OpenAI
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: msgs,
    });
    const assistant = chat.choices?.[0]?.message;
    if (assistant) {
      await prisma.message.create({
        data: { conversationId: Number(id), role: assistant.role, content: assistant.content },
      });
    }

    const updated = await prisma.conversation.findUnique({
      where: { id: Number(id) },
      include: { messages: true },
    });
    return res.status(200).json(updated);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
