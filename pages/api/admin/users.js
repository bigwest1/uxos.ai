import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { isAdminUser } from '../../../helpers/roleService';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await clerkClient.users.getUser(userId);
  if (!isAdminUser(user)) return res.status(403).json({ error: 'Forbidden' });

  // List all users from Prisma for admin
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}
