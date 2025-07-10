import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  const { id } = req.query;
  if (req.method === 'GET') {
    const tpl = await prisma.appBlueprint.findUnique({ where: { id } });
    return res.json(tpl);
  }
  if (req.method === 'DELETE') {
    await prisma.appBlueprint.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader('Allow', ['GET','DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
