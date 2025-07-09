import useSWR from 'swr';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminUsersPage() {
  const { user, isSignedIn } = useUser();
  const { data, error } = useSWR(isSignedIn ? '/api/admin/users' : null, fetcher);

  if (!isSignedIn) return <p className="p-6">Sign in as admin to view this page.</p>;
  if (error) return <p className="p-6 text-red-500">Unauthorized or error.</p>;
  if (!data) return <p className="p-6">Loading users…</p>;

  return (
    <>
      <Head><title>Admin: Users</title></Head>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <table className="min-w-full bg-gray-800 text-white">
          <thead><tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
          </tr></thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="even:bg-gray-700">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
