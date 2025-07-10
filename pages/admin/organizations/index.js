import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import ProtectedPage from '../../../components/ProtectedPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

function OrgIndexPage() {
  const { user, isSignedIn } = useUser();
  const { data, error } = useSWR(isSignedIn ? '/api/admin/organizations' : null, fetcher);
  if (!isSignedIn) return <p className="p-6">Sign in to view your organizations.</p>;
  if (error) return <p className="p-6 text-red-500">Error loading organizations.</p>;
  if (!data) return <p className="p-6">Loading…</p>;
  return (
    <>
      <Head><title>My Organizations</title></Head>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Organizations</h1>
        <ul className="list-disc pl-5">
          {data.map((org) => (
            <li key={org.id} className="mb-2">
              <Link href={`/admin/organizations/${org.id}`}>
                <a className="text-blue-400 hover:underline">{org.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default ProtectedPage(OrgIndexPage);
