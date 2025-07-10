import { getAuth } from '@clerk/nextjs/server';
import { checkOrgRole } from '../../../../../helpers/orgService';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  const { orgId } = req.query;
  const { role } = req.query;
  try {
    const allowed = await checkOrgRole(userId, orgId, role);
    return res.json({ allowed });
  } catch (err) {
    return res.status(500).json({ error: 'Role check failed' });
  }
}
