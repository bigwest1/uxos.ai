import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Cron endpoint to purge old conversations per organization retention policy.
 * POST /api/cron/retention
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const orgs = await prisma.organization.findMany();
  const now = new Date();
  let totalDeleted = 0;
  for (const org of orgs) {
    const cutoff = new Date(now.getTime() - org.retentionDays * 24 * 60 * 60 * 1000);
    const convs = await prisma.conversation.findMany({
      where: { createdAt: { lt: cutoff }, organizationId: org.id },
    });
    for (const conv of convs) {
      await prisma.$transaction([
        prisma.messageEmbedding.deleteMany({ where: { conversationId: conv.id } }),
        prisma.memorySummary.deleteMany({ where: { conversationId: conv.id } }),
        prisma.message.deleteMany({ where: { conversationId: conv.id } }),
        prisma.conversation.delete({ where: { id: conv.id } }),
      ]);
      totalDeleted++;
    }
  }
  res.json({ purged: totalDeleted });
}
