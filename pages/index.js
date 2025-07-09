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
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-6 py-20 lg:py-32">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl animate-fade-in">
                Hack Your UX Flow with AI
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Instantly analyze and redesign competitor flows to boost conversions
                and delight users with our AI‑powered toolkit.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#tools"
                  className="rounded-full bg-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Get Started
                </a>
                <a
                  href="/"
                  className="rounded-full border border-indigo-500 px-6 py-3 text-lg font-semibold text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  Download Toolkit
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-full h-64 rounded-lg bg-gray-700 animate-pulse" />
            </div>
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
