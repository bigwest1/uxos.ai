import { useState } from 'react';
import { StarIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import TypingIndicator from './TypingIndicator';
import FeedbackControls from './FeedbackControls';
import ThemeSwitcher from './ThemeSwitcher';

export default function AIAnalysisPanel({ steps, onResult }) {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { result } = await res.json();
      setAnalysis(result);
      onResult({ improvedSteps: result.improvedSteps, abIdeas: result.abIdeas });
    } catch (err) {
      console.error('Analysis failed', err);
      setError(err.message || 'Unknown error');
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
      {error && (
        <div className="p-4 bg-red-600 text-white rounded">Error: {error}</div>
      )}
      {!analysis ? (
        <div className="space-y-4">
          <p className="text-gray-300">Analyze steps for friction points and improved redesign.</p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center justify-center"
          >
            {loading ? <TypingIndicator /> : 'Run Analysis'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Summary</h3>
            <p className="text-gray-200">{analysis.summary}</p>
            <FeedbackControls onFeedback={(f) => console.log('Analysis feedback:', f)} />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Insights & Ratings</h3>
            {analysis.stepInsights.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <StarIcon key={j} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-gray-100">{s.title}</p>
                  <p className="text-gray-400 text-sm">{s.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
