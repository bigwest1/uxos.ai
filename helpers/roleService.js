import { ClerkAPIError } from '@clerk/clerk-sdk-node';
import { clerkClient } from '@clerk/nextjs/server';

/**
 * Check if a Clerk user has the 'admin' role (stored in publicMetadata).
 */
export function isAdminUser(user) {
  try {
    return user.publicMetadata?.role === 'admin';
  } catch {
    return false;
  }
}
