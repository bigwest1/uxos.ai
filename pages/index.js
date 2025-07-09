// Main home screen assembling the menu and download button
import Head from 'next/head';
import { tools } from '../data/tools.js';
import ToolMenu from '../components/ToolMenu.jsx';
import DownloadButton from '../components/DownloadButton.jsx';
import FadeInSection from '../components/FadeInSection';

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
        <FadeInSection>
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 py-20 lg:py-32">
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
                  className="btn btn-primary transition-transform hover:scale-105"
                >
                  Get Started
                </a>
                <a
                  href="/"
                  className="btn btn-outline"
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
        </FadeInSection>

        {/* Tool menu */}
        <FadeInSection>
          <section id="tools" className="container mx-auto py-16">
            <ToolMenu tools={tools} />
          </section>
        </FadeInSection>

        {/* Download button */}
        <FadeInSection>
          <section className="py-12 text-center">
            <DownloadButton />
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
