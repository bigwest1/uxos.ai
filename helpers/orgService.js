import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Check if a user belongs to an organization with at least the given role.
 */
export async function checkOrgRole(userId, orgId, minRole) {
  const membership = await prisma.membership.findUnique({
    where: { userId_organizationId: { userId, organizationId: orgId } }
  });
  if (!membership) return false;
  const hierarchy = ['member', 'admin', 'owner'];
  return hierarchy.indexOf(membership.role) >= hierarchy.indexOf(minRole);
}
