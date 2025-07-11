// Main home screen assembling the menu and download button
import Head from 'next/head';
import { tools } from '../data/tools.js';
import ToolMenu from '../components/ToolMenu.jsx';
import DownloadButton from '../components/DownloadButton.jsx';
import { useUser } from '@clerk/nextjs';
import ThemeSwitcher from '../components/ThemeSwitcher.jsx';
import FortuneTeller from '../components/FortuneTeller.jsx';
import DecisionLab from '../components/DecisionLab.jsx';

/**
 * Show a subscription CTA and redirect to Stripe checkout.
 */
function SubscribeButton() {
  const { user } = useUser();
  const handleSubscribe = async () => {
    if (!user) return;
    const res = await fetch('/api/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, email: user.emailAddresses[0].emailAddress }),
    });
    const { sessionId } = await res.json();
    const stripe = await import('@stripe/stripe-js').then((m) => m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    stripe.redirectToCheckout({ sessionId });
  };
  return (
    <button onClick={handleSubscribe} className="btn btn-primary">
      Subscribe
    </button>
  );
}
import FadeInSection from '../components/FadeInSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>UXOS Tools</title>
        <meta
          name="description"
          content="World-class toolkit for modern UX research and design."
        />
      </Head>

          <main className="min-h-screen flex flex-col">
        {/* Hero section */}
        <FadeInSection>
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 py-20 lg:py-32">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl animate-fade-in">
                Hack Your UX Flow with AI
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Instantly analyze and redesign competitor flows to boost conversions
                and delight users with our AI‑powered toolkit.
              </p>
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <a
                href="#tools"
                className="btn btn-primary transition-transform hover:scale-105"
              >
                Get Started
              </a>
              <a
                href="/"
                className="btn btn-outline"
              >
                Download Toolkit
              </a>
              <ThemeSwitcher />
              <SubscribeButton />
            </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-full h-64 rounded-lg bg-gray-700 animate-pulse" />
            </div>
          </div>
          </section>
        </FadeInSection>

        {/* Quantum Fortune Teller module */}
       <FadeInSection>
         <section className="container mx-auto py-16">
           <FortuneTeller />
         </section>
       </FadeInSection>

        {/* Quantum Revenue Simulator */}
        <FadeInSection>
          <section className="container mx-auto py-16">
            <DecisionLab />
          </section>
        </FadeInSection>

        {/* Tool menu */}
        <FadeInSection>
          <section id="tools" className="container mx-auto py-16">
            <ToolMenu tools={tools} />
          </section>
        </FadeInSection>

        {/* Download button */}
        <FadeInSection>
          <section className="py-12 text-center">
            <DownloadButton />
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
