import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { isAdminUser } from '../../../../helpers/roleService';
import { clerkClient } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await clerkClient.users.getUser(userId);
  if (!isAdminUser(user)) return res.status(403).json({ error: 'Forbidden' });

  if (req.method === 'GET') {
    const { orgId } = req.query;
    if (orgId) {
      const org = await prisma.organization.findUnique({
        where: { id: Number(orgId) },
        include: { memberships: { include: { user: true } } },
      });
      return res.status(200).json(org);
    }
    const orgs = await prisma.organization.findMany();
    return res.status(200).json(orgs);
  }
  if (req.method === 'PATCH') {
    const { orgId } = req.query;
    const { retentionDays } = req.body;
    await prisma.organization.update({ where: { id: Number(orgId) }, data: { retentionDays } });
    const updated = await prisma.organization.findUnique({ where: { id: Number(orgId) } });
    return res.status(200).json(updated);
  }
  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).end();
}
