import { useState } from 'react';
import { OpenAI } from 'openai';

export default function AIAnalysisPanel({ steps, onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runAnalysis = async () => {
    setLoading(true);
    setError('');
    try {
      const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY });
      const messages = [
        {
          role: 'system',
          content:
            'You are a senior UX analyst. Review each step and suggest improvements.',
        },
        { role: 'user', content: JSON.stringify(steps) },
      ];
      const chat = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
      });
      onResult(JSON.parse(chat.choices[0].message.content));
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
