import { useState } from 'react';
import { callAppropriateModel } from '../lib/llmRouter';

export default function PatternMiner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDiscover = async () => {
    setLoading(true);
    try {
      const messages = [
        { role: 'system', content: 'Extract UX design patterns from the following app descriptions.' },
        { role: 'user', content: input },
      ];
      const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
      setOutput(resp.choices?.[0]?.message?.content || '');
    } catch (err) {
      console.error(err);
      setOutput('Error extracting patterns.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card space-y-4">
      <h2 className="text-2xl font-bold text-white">UX Pattern Miner</h2>
      <textarea
        rows={6}
        className="w-full rounded bg-gray-700 p-4 text-gray-100"
        placeholder="Describe top apps/features to mine patterns..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleDiscover}
        disabled={loading || !input}
        className="btn btn-primary"
      >
        {loading ? 'Mining...' : 'Discover Patterns'}
      </button>
      {output && (
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {output}
        </pre>
      )}
    </section>
  );
}
