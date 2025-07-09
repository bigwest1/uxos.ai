// Main home screen assembling the menu and download button
import Head from 'next/head';
import { tools } from '../data/tools.js';
import ToolMenu from '../components/ToolMenu.jsx';
import DownloadButton from '../components/DownloadButton.jsx';

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

          <main className="min-h-screen flex flex-col">
        {/* Hero section */}
        <section className="relative bg-gradient-to-b from-brand-dark to-gray-900 text-white text-center">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h1 className="text-4xl font-bold sm:text-5xl animate-fade-in">
              Level Up Your UX Workflow
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Explore AI-powered tools to craft exceptional experiences
            </p>
            <a
              href="#tools"
              className="mt-8 inline-block rounded-md bg-brand-orange px-6 py-3 font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Explore Tools
            </a>
          </div>
        </section>

        {/* Tool menu */}
        <section id="tools" className="mx-auto w-full max-w-5xl px-4 py-12">
          <ToolMenu tools={tools} />
        </section>

        {/* Download button */}
        <section className="py-12 text-center">
          <DownloadButton />
        </section>
      </main>
    </>
  );
}
