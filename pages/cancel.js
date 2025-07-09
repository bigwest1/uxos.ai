import Head from 'next/head';
import Link from 'next/link';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Payment Cancelled</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="mb-6">Your subscription has not been processed.</p>
        <Link href="/">
          <a className="px-5 py-3 bg-gray-700 rounded hover:bg-gray-600">Go Home</a>
        </Link>
      </main>
    </>
  );
}
