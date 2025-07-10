import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

/**
 * Client-side guard for required org-level roles.
 * Redirects to sign-in if not authenticated, or to home if lacking role.
 */
export default function RequireRole({ orgId, role, children }) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    fetch(`/api/admin/organizations/${orgId}/role?role=${role}`)
      .then((res) => res.json())
      .then(({ allowed }) => {
        if (!allowed) {
          router.push('/');
        } else {
          setAllowed(true);
        }
      });
  }, [isLoaded, isSignedIn, orgId, role, router]);

  if (!allowed) {
    return <p className="p-6">Checking permissions…</p>;
  }
  return <>{children}</>;
}
