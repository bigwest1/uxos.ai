import Stripe from 'stripe';
import { getAuth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { appId, plan } = req.body;
  // Define price mapping; replace with dynamic pricing logic
  const priceLookup = {
    subscription: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
    'one-time': process.env.STRIPE_PRICE_ID,
    freemium: null,
  };
  const priceId = priceLookup[plan];
  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan' });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: plan === 'subscription' ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/apps/${appId}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/apps/preview`,
    metadata: { appId, owner: userId },
  });
  res.status(200).json({ sessionId: session.id });
}
