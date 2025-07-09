import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Record an audit log entry for GDPR & compliance.
 */
export async function logAudit(userId, action, metadata = {}) {
  await prisma.auditLog.create({
    data: { userId, action, metadata },
  });
}
