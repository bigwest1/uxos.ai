import { useState } from 'react';
import PromptTemplateSelector from './PromptTemplateSelector';
import ShortcutHotkeys from './ShortcutHotkeys';

export default function InputPanel({ onSubmit }) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [frames, setFrames] = useState([]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const framesArr = [];
    if (file.type.startsWith('image/')) {
      framesArr.push(URL.createObjectURL(file));
    } else if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      const videoEl = document.createElement('video');
      videoEl.src = url;
      await videoEl.play().catch(() => {});
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');
      const interval = 1000; // one frame per second
      const duration = videoEl.duration * 1000;
      for (let time = 0; time < duration; time += interval) {
        videoEl.currentTime = time / 1000;
        await new Promise((resolve) => { videoEl.onseeked = resolve; });
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        framesArr.push(canvas.toDataURL());
        if (framesArr.length >= 5) break;
      }
      videoEl.pause();
    }
    setFrames(framesArr);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = () => {
    if (!text && frames.length === 0 && !link) return;
    const titles = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const count = Math.max(titles.length, frames.length);
    const steps = Array.from({ length: count }).map((_, i) => ({
      title: titles[i] || `Step ${i + 1}`,
      summary: '',
      image: frames[i],
    }));
    onSubmit(steps);
  };

  const handleClear = () => {
    setText('');
    setLink('');
    setFrames([]);
  };

  return (
    <>
      <ShortcutHotkeys onSend={handleSubmit} onClear={handleClear} />
      <section className="card space-y-6">
      <h2 className="text-2xl font-bold text-white">1. Competitor Flow</h2>
      <textarea
        className="w-full rounded-lg bg-gray-700 border border-gray-600 p-4 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        rows={6}
        placeholder="Step 1: …&#10;Step 2: …"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <PromptTemplateSelector onSelect={(tpl) => setText((t) => `${tpl}: ${t}`)} />
      <input
        className="w-full rounded-lg bg-gray-700 border border-gray-600 p-4 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        type="text"
        placeholder="Link to screenshots or video (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-gray-600 bg-gray-700 text-gray-400"
      >
        {frames.length > 0
          ? `${frames.length} frame${frames.length > 1 ? 's' : ''} loaded`
          : 'Drag & drop screenshots or video here'}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-600 transition-all"
      >
        Analyze Flow
      </button>
    </section>
    </>
  );
}
