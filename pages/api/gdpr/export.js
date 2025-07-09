import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { logAudit } from '../../../helpers/auditService';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  // Fetch all user data for export
  const conversations = await prisma.conversation.findMany({
    where: { userId },
    include: { messages: true, memorySummary: true, messageEmbedding: true },
  });
  await logAudit(userId, 'export_data', { count: conversations.length });
  res.status(200).json({ conversations });
}
