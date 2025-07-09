import '../styles/global.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClerkProvider } from '@clerk/nextjs';
import { AIProvider } from '../contexts/AIContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <ErrorBoundary>
        <Elements stripe={stripePromise}>
          <ThemeProvider>
            <AIProvider>
              <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
                <Component {...pageProps} />
              </div>
            </AIProvider>
          </ThemeProvider>
        </Elements>
      </ErrorBoundary>
    </ClerkProvider>
  );
}

export default App;
