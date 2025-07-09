import { useState, useEffect, useRef } from 'react';
import { useAI } from '../contexts/AIContext';
import TypingIndicator from './TypingIndicator';
import FeedbackControls from './FeedbackControls';

/**
 * Chat UI that streams assistant responses via SSE.
 */
export default function ChatPanel() {
  const { conversationId, messages, sendMessage, loading } = useAI();
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const evtRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;
    const es = new EventSource(`/api/conversations/${conversationId}/stream`);
    evtRef.current = es;
    es.onmessage = (e) => {
      const { delta } = JSON.parse(e.data);
      setStreaming(true);
      setStreamContent((prev) => prev + delta);
    };
    es.addEventListener('done', () => {
      setStreaming(false);
      es.close();
    });
    return () => es.close();
  }, [conversationId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  return (
    <section className="space-y-4">
      <div className="max-h-80 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-semibold text-gray-200">{m.role}:</span>
            <p className="whitespace-pre-wrap text-gray-100">{m.content}</p>
          </div>
        ))}
        {streaming && (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-200">assistant:</span>
            <p className="whitespace-pre-wrap text-gray-100">{streamContent}<TypingIndicator /></p>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <textarea
          rows={2}
          className="flex-1 rounded bg-gray-700 p-2 text-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} disabled={loading} className="btn btn-primary">
          Send
        </button>
      </div>
      <FeedbackControls onFeedback={(f) => console.log('chat feedback:', f)} />
    </section>
  );
}
