import Head from 'next/head';
import { useState } from 'react';
import { callAppropriateModel } from '../lib/llmRouter';

export default function StudioPage() {
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('Clean, modern, dopaminergic UI');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const messages = [
        {
          role: 'system',
          content: `You are the Quantum UX AI App Studio. Generate a JSON blueprint for a micro-app based on the user description and style. The blueprint must include: appName, primaryColor, pages (array of { name, mermaidFlow }), branding (logoUrl placeholder), monetizationOptions (["subscription","one-time","freemium"]), and userOnboardingSteps. Return valid JSON only.`,
        },
        { role: 'user', content: JSON.stringify({ description, style }) },
      ];
      const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
      const data = JSON.parse(resp.choices?.[0]?.message?.content || '{}');
      setOutput(data);
    } catch (err) {
      console.error('App generation failed', err);
      setOutput({ error: 'Generation error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI App Studio</title>
      </Head>
      <main className="mx-auto max-w-3xl space-y-6 p-6">
        <h1 className="text-3xl font-bold text-brand-dark">Quantum AI App Studio</h1>
        <textarea
          rows={4}
          className="w-full rounded bg-gray-100 p-4"
          placeholder="Describe your micro-app need (e.g. customer feedback portal)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="w-full rounded bg-gray-100 p-4"
          placeholder="Style / branding guidance"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !description}
          className="btn btn-primary"
        >
          {loading ? 'Generating...' : 'Generate Micro-App'}
        </button>
        {output && (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(output, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}
