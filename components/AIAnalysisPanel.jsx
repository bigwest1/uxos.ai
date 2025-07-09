import { useState } from 'react';
import { StarIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function AIAnalysisPanel({ steps, onResult }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // Simulate AI-driven analysis
    await new Promise((r) => setTimeout(r, 800));
    const summary =
      'Identified friction points around ambiguous labels and lengthy forms. Users may drop off at steps with high cognitive load.';
    const stepInsights = steps.map((s, i) => ({
      title: s.title,
      rating: Math.floor(Math.random() * 3) + 3,
      insight: `Simplify “${s.title}” to reduce friction.`,
    }));
    const improvedSteps = steps.map((s) => ({
      title: s.title,
      summary: `Optimized ${s.title.toLowerCase()} with clearer copy and streamlined actions.`,
      rating: Math.floor(Math.random() * 3) + 4,
    }));
    const abIdeas = [
      'Test single vs. multi-column layout on checkout',
      'Emphasize social proof near CTA',
      'Use progressive disclosure for advanced options',
    ];
    const data = { summary, stepInsights, improvedSteps, abIdeas };
    setAnalysis(data);
    onResult({ improvedSteps, abIdeas });
    setLoading(false);
  };

  return (
    <section className="space-y-4 rounded-lg border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-brand-dark">2. AI-Powered Analysis</h2>
      {!analysis ? (
        <div className="space-y-2">
          <p className="text-gray-700">
            Analyze for friction, cognitive load, and conversion blockers.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded bg-brand-orange px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <ExclamationCircleIcon className="h-6 w-6 text-brand-orange" />
            <p className="text-gray-800">{analysis.summary}</p>
          </div>
          <div className="space-y-3">
            {analysis.stepInsights.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-gray-600">{s.insight}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <StarIcon key={j} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
