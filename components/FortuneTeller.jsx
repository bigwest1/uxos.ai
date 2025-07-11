import { useState } from 'react';
import { useStripe, loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

export default function FortuneTeller() {
  const [question, setQuestion] = useState('');
  const router = useRouter();

  const handleAsk = async () => {
    if (!question) return;
    const res = await fetch('/api/checkout-fortune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const { sessionId } = await res.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    stripe.redirectToCheckout({ sessionId });
  };

  return (
    <section className="mx-auto max-w-3xl p-8 bg-yellow-100 rounded-lg text-center space-y-4">
      <h2 className="text-3xl font-bold">Quantum Fortune Teller</h2>
      <p className="text-gray-700">Ask anything, pay once, and receive your personalized quantum fortune!</p>
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          placeholder="What's on your mind?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 border rounded" />
        <button
          onClick={handleAsk}
          disabled={!question}
          className="btn btn-primary"
        >
          Get Fortune
        </button>
      </div>
    </section>
  );
}
