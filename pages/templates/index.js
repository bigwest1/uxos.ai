import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then(setTemplates);
  }, []);

  return (
    <>
      <Head><title>My Templates</title></Head>
      <main className="p-6 mx-auto max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold">My Published Templates</h1>
        {templates.map((tpl) => (
          <div key={tpl.id} className="p-4 bg-gray-100 rounded flex justify-between">
            <div>
              <h2 className="font-medium">{tpl.description}</h2>
              <p className="text-sm text-gray-600">Style: {tpl.style}</p>
            </div>
            <a href={`/apps/${tpl.id}`} className="btn btn-primary">View App</a>
          </div>
        ))}
        {templates.length === 0 && <p>No templates published yet.</p>}
      </main>
    </>
  );
}
