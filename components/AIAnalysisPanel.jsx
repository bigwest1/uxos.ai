import { useState } from 'react';
import { StarIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import TypingIndicator from './TypingIndicator';
import FeedbackControls from './FeedbackControls';
import ThemeSwitcher from './ThemeSwitcher';

export default function AIAnalysisPanel({ steps, onResult }) {
  const [analysis, setAnalysis] = useState(null);
  const [analysisCtrl, setAnalysisCtrl] = useState({ state: 'idle', progress: 0 });
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps }),
      });
      const { result } = await res.json();
      setAnalysis({
        summary: result.summary,
        stepInsights: result.stepInsights,
        improvedSteps: result.improvedSteps,
        abIdeas: result.abIdeas,
      });
      onResult({ improvedSteps: result.improvedSteps, abIdeas: result.abIdeas });
    } catch (err) {
      console.error('Analysis failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card space-y-6">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>
      <h2 className="text-2xl font-bold text-white">2. AI-Powered Analysis</h2>
      {!analysis ? (
        <div className="space-y-4">
          <p className="text-gray-300">
            Analyze steps for friction points, cognitive load, and blockers.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center justify-center"
          >
            {loading ? <TypingIndicator /> : 'Run Analysis'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="h-6 w-6 text-indigo-400" />
            <p className="text-gray-200">{analysis.summary}</p>
          </div>
          <div className="space-y-4">
            {analysis.stepInsights.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">{s.title}</p>
                  <p className="text-sm text-gray-400">{s.insight}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <StarIcon key={j} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <FeedbackControls onFeedback={(f) => console.log('Analysis feedback:', f)} />
        </div>
      )}
    </section>
  );
}
