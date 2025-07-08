// Main home screen assembling the menu and download button
import Head from 'next/head';
import { tools } from '../data/tools';
import ToolMenu from '../components/ToolMenu';
import DownloadButton from '../components/DownloadButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>UXOS Tools</title>
        <meta
          name="description"
          content="World-class toolkit for modern UX research and design."
        />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-start">
        {/* Header */}
        <header className="w-full bg-brand-dark py-8 text-center text-white">
          <h1 className="text-3xl font-bold">Welcome to UXOS Tools</h1>
          <p className="mt-2 text-lg text-gray-300">
            Choose a tool to start crafting great experiences
          </p>
        </header>

        {/* Tool menu */}
        <div className="mt-10 w-full">
          <ToolMenu tools={tools} />
        </div>

        {/* Download button */}
        <div className="mt-12">
          <DownloadButton />
        </div>
      </main>
    </>
  );
}
