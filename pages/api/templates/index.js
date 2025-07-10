import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  if (req.method === 'GET') {
    const list = await prisma.appBlueprint.findMany({ where: { ownerId: Number(userId) } });
    return res.json(list);
  }
  if (req.method === 'POST') {
    const { description, style, blueprint } = req.body;
    const record = await prisma.appBlueprint.create({
      data: { ownerId: Number(userId), description, style, blueprint }
    });
    return res.status(201).json(record);
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
