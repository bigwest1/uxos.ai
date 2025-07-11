import Head from 'next/head';
import { useState } from 'react';
import { callAppropriateModel } from '../lib/llmRouter';

export default function BulkPage() {
  const [csv, setCsv] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBulk = async () => {
    setLoading(true);
    try {
      const messages = [
        { role: 'system', content: 'You are QAAS bulk app generator. Parse the following CSV of app descriptions and styles, output a JSON array of blueprint objects (appName, description, style, mermaidFlow pages).' },
        { role: 'user', content: csv },
      ];
      const resp = await callAppropriateModel(messages, { model: process.env.OPENAI_PRIMARY_MODEL });
      setResults(JSON.parse(resp.choices[0].message.content));
    } catch (err) {
      console.error(err);
      setResults({ error: 'Bulk generation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Bulk Generator</title></Head>
      <main className="p-6 mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Bulk App Generator</h1>
        <textarea
          rows={6}
          className="w-full p-4 border rounded"
          placeholder="appName,description,style..." value={csv} onChange={e=>setCsv(e.target.value)}
        />
        <button disabled={loading||!csv} onClick={handleBulk} className="btn btn-primary">
          {loading?'Processing...':'Generate Bulk'}
        </button>
        {results && <pre className="p-4 bg-gray-100 rounded text-sm overflow-auto">{JSON.stringify(results,null,2)}</pre>}
      </main>
    </>
  );
}
