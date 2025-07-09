#!/usr/bin/env node
/**
 * Worker to batch embeddings of messages for efficiency.
 */
import { Worker } from 'bullmq';
import { connection } from '../lib/queues';
import { OpenAI } from 'openai';
import prisma from '../lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

new Worker(
  'embedBatch',
  async (job) => {
    const messages = job.data.messages; // [{id, content}]
    const resp = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
      input: messages.map((m) => m.content),
    });
    const toUpsert = resp.data.map((d, i) => ({ messageId: messages[i].id, embedding: d.embedding }));
    await prisma.$transaction(
      toUpsert.map((e) =>
        prisma.messageEmbedding.upsert({
          where: { messageId: e.messageId },
          create: e,
          update: { embedding: e.embedding },
        })
      )
    );
  },
  { connection }
);
