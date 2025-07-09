import Head from 'next/head';
import ChatPanel from '../components/ChatPanel';

export default function ChatPage() {
  return (
    <>
      <Head>
        <title>AI Chat</title>
      </Head>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">AI Chat</h1>
        <ChatPanel />
      </main>
    </>
  );
}
