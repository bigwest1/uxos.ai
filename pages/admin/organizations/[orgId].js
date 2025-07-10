import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import ProtectedPage from '../../../components/ProtectedPage';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((r) => r.json());

function OrgDetailPage() {
  const router = useRouter();
  const { orgId } = router.query;
  const { user, isSignedIn } = useUser();
  const { data, error, mutate } = useSWR(
    isSignedIn && orgId ? `/api/admin/organizations?orgId=${orgId}` : null,
    fetcher
  );
  const [inviteEmail, setInviteEmail] = useState('');

  const handleRetention = async () => {
    await fetch('/api/cron/retention', { method: 'POST' });
  };

  const handleInvite = async () => {
    await fetch(`/api/admin/organizations/invite?orgId=${orgId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail }),
    });
    setInviteEmail('');
    mutate();
  };

  if (!isSignedIn) return <p className="p-6">Please sign in.</p>;
  if (error) return <p className="p-6 text-red-500">{error.message}</p>;
  if (!data) return <p className="p-6">Loading organization…</p>;

  return (
    <>
      <Head><title>Org: {data.name}</title></Head>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Organization: {data.name}</h1>
        <h2 className="text-xl mt-6">Members</h2>
        <ul className="list-disc pl-5">
          {data.memberships.map((m) => (
            <li key={m.id}>{m.user.email} ({m.role})</li>
          ))}
        </ul>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm">Data Retention (days):</label>
            <input
              type="number"
              value={data.retentionDays}
              onChange={async (e) => {
                const days = parseInt(e.target.value, 10);
                await fetch(`/api/admin/organizations?orgId=${orgId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ retentionDays: days }),
                });
                mutate();
              }}
              className="mt-1 p-2 border rounded w-24"
            />
          </div>
          <div className="space-x-2">
            <button onClick={handleRetention} className="btn btn-outline">
              Run Retention Now
            </button>
            <input
              type="email"
              placeholder="Invite user by email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="p-2 border rounded mr-2"
            />
            <button onClick={handleInvite} className="btn btn-primary">
              Send Invite
            </button>
          </div>
        </div>
      </main>
    </>
  );

}

export default ProtectedPage(OrgDetailPage);
