import Head from 'next/head';
import React, { useState } from 'react';
import { tools } from '../../data/tools';
import InputPanel from '../../components/InputPanel';
import JourneyMap from '../../components/JourneyMap';
import AIAnalysisPanel from '../../components/AIAnalysisPanel';
import RedesignedFlow from '../../components/RedesignedFlow';
import ABTestIdeas from '../../components/ABTestIdeas';

export async function getStaticPaths() {
  const paths = tools.map((tool) => ({ params: { slug: tool.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tool = tools.find((t) => t.id === params.slug);
  if (!tool) {
    return { notFound: true };
  }
  const { id, title, description } = tool;
  return { props: { tool: { id, title, description } } };
}

export default function ToolPage({ tool }) {
  if (tool.id === 'flow') {
    return <FlowHacker />;
  }
  const found = tools.find((t) => t.id === tool.id);
  const Icon = found.icon;
  return (
    <>
      <Head>
        <title>{tool.title} - UXOS Tools</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark text-white">
            <Icon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">{tool.title}</h1>
          <p className="text-gray-700">{tool.description}</p>
        </div>
      </main>
    </>
  );
}

const mockAnalysis = {
  improvedSteps: [
    { title: 'Streamlined signup', summary: 'One-tap with SSO', rating: 5 },
    { title: 'Onboarding tips', summary: 'Tiny coach marks', rating: 4 },
  ],
  abIdeas: [
    'Test single vs. multi-column layout on checkout',
    'Emphasize social proof near CTA',
  ],
};

function FlowHacker() {
  const [steps, setSteps] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  const handleInput = ({ text = '' }) => {
    if (!text || typeof text !== 'string') {
      console.error('Input text must be a string.');
      return;
    }
    const parsed = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((s) => ({ title: s, summary: '' }));
    setSteps(parsed);
  };

  const handleAnalysisResult = (data) => {
    setAnalysis(data);
  };

  return (
    <>
      <Head>
        <title>UX Flow Hacker</title>
      </Head>
      <main className="mx-auto max-w-5xl space-y-8 p-6 font-sans">
        <h1 className="text-3xl font-bold text-brand-dark">UX Flow Hacker</h1>
        <InputPanel onSubmit={handleInput} />
        {steps.length > 0 && (
          <>
            <JourneyMap steps={steps} onReorder={setSteps} />
            <AIAnalysisPanel steps={steps} onResult={handleAnalysisResult} />
          </>
        )}
        {analysis ? (
          <>
            <RedesignedFlow steps={analysis.improvedSteps} />
            <ABTestIdeas ideas={analysis.abIdeas} />
          </>
        ) : null}
      </main>
    </>
  );
}
