import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { logAudit } from '../../../helpers/auditService';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  // Delete all user-related data (GDPR right to erasure)
  await prisma.$transaction([
    prisma.messageEmbedding.deleteMany({ where: { conversation: { userId } } }),
    prisma.memorySummary.deleteMany({ where: { conversation: { userId } } }),
    prisma.message.deleteMany({ where: { conversation: { userId } } }),
    prisma.conversation.deleteMany({ where: { userId } }),
    prisma.auditLog.deleteMany({ where: { userId } }),
  ]);
  await logAudit(userId, 'delete_data');
  res.status(200).json({ deleted: true });
}
