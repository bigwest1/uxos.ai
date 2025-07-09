import { useState } from 'react';

export default function InputPanel({ onSubmit }) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = () => {
    if (!text && !link) return;
    onSubmit({ text, link });
  };

  return (
    <section className="space-y-4 rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-brand-dark">
        1. Paste competitor flow
      </h2>
      <textarea
        className="w-full rounded border p-3"
        rows={6}
        placeholder="Step 1: …&#10;Step 2: …"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-full rounded border p-3"
        type="text"
        placeholder="Link to screenshots or video (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="rounded bg-brand-orange px-4 py-2 font-semibold text-white hover:opacity-90"
      >
        Analyze Flow
      </button>
    </section>
  );
}
