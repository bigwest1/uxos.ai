import { useEffect, useState } from 'react';
import Head from 'next/head';

import { useAppBuilder } from '../../contexts/AppBuilderContext';
import { useRouter } from 'next/router';

export default function TemplatesPage() {
  const { setBlueprint } = useAppBuilder();
  const router = useRouter();
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
          <div key={tpl.id} className="p-4 bg-gray-100 rounded flex items-center justify-between">
            <div>
              <h2 className="font-medium">{tpl.description}</h2>
              <p className="text-sm text-gray-600">Style: {tpl.style}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => window.location.assign(`/apps/${tpl.id}`)}
                className="btn btn-primary"
              >
                View
              </button>
              <button
                onClick={async () => {
                  if (!confirm('Delete this template?')) return;
                  await fetch(`/api/templates/${tpl.id}`, { method: 'DELETE' });
                  setTemplates((t) => t.filter((x) => x.id !== tpl.id));
                }}
                className="btn btn-outline text-red-600"
              >
                Delete
              </button>
              <button
                onClick={async () => {
                  const resp = await fetch(`/api/templates/${tpl.id}`);
                  const { description, style, blueprint } = await resp.json();
                  setBlueprint(blueprint);
                  window.location.assign('/apps/preview');
                }}
                className="btn btn-secondary"
              >
                Fork
              </button>
            </div>
          </div>
        ))}
        {templates.length === 0 && <p>No templates published yet.</p>}
      </main>
    </>
  );
}
