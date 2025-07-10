import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { isAdminUser } from '../../../../helpers/roleService';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const adminUser = await clerkClient.users.getUser(userId);
  if (!isAdminUser(adminUser)) return res.status(403).json({ error: 'Forbidden' });

  const { orgId } = req.query;
  const { email } = req.body;
  // Create membership as 'member' pending acceptance
  const users = await clerkClient.users.getUserList({ email_address: [email] });
  const user = users[0];
  if (!user) return res.status(404).json({ error: 'User not found' });
  await prisma.membership.create({ data: { userId: user.id, organizationId: Number(orgId), role: 'member' } });
  res.status(200).json({ invited: email });
}
