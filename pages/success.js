import Head from 'next/head';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default function Success() {
  return (
    <>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Thank you for subscribing!</h1>
        <p className="mb-6">Your subscription is now active. Enjoy the full AI toolkit.</p>
        <Link href="/">
          <a className="px-5 py-3 bg-indigo-500 rounded hover:bg-indigo-600">Go Home</a>
        </Link>
      </main>
    </>
  );
}
