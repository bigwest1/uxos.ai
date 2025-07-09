import { useState } from 'react';

export default function AIAnalysisPanel({ steps, onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runAnalysis = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps }),
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
      }

      onResult(JSON.parse(text));
    } catch (err) {
      setError('Analysis failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-brand-dark">
        3. AI findings
      </h2>
      <button
        className="rounded bg-brand-orange px-4 py-2 font-semibold text-white hover:opacity-90"
        onClick={runAnalysis}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Run AI Analysis'}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </section>
  );
}