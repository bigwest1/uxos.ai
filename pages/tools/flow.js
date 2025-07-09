import { useState } from 'react';
import Head from 'next/head';
import InputPanel from '../../components/InputPanel';
import JourneyMap from '../../components/JourneyMap';
import AIAnalysisPanel from '../../components/AIAnalysisPanel';
import RedesignedFlow from '../../components/RedesignedFlow';
import ABTestIdeas from '../../components/ABTestIdeas';

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

export default function FlowHacker() {
  const [steps, setSteps] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  const handleInput = ({ text }) => {
    const parsed = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((s) => ({ title: s, summary: '' }));
    setSteps(parsed);
  };

  const handleAnalysisResult = (data) => {
    // `data` should contain { improvedSteps, abIdeas, ... }
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

        {/* Mock data for demo – remove when AI is connected */}
        {!analysis && steps.length > 0 && (
          <button
            onClick={() => setAnalysis(mockAnalysis)}
            className="rounded bg-gray-200 px-3 py-1 text-sm"
          >
            Load Mock Results
          </button>
        )}
      </main>
    </>
  );
}
