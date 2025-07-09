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
        <section className="relative bg-gray-900 text-gray-100 text-center">
          <div className="mx-auto max-w-4xl px-6 py-32">
            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl animate-fade-in">
              Hack Your UX Flow
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Instant AI‑powered analysis and redesign of competitor flows.
            </p>
            <a
              href="#tools"
              className="mt-10 inline-block rounded-full bg-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Get Started
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
