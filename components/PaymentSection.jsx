import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

/**
 * Renders payment options and Stripe checkout form.
 */
export default function PaymentSection({ options, appId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (opt) => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, plan: opt }),
      });
      const { sessionId } = await res.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Purchase Options</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handlePayment(opt)}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Processing…' : opt === 'subscription' ? 'Subscribe' : 'Buy Now'}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4 p-4 border rounded bg-white">
        <CardElement />
      </div>
    </div>
  );
}
