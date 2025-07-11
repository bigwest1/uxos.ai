import '../styles/global.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClerkProvider } from '@clerk/nextjs';
import { AIProvider } from '../contexts/AIContext';
import { AppBuilderProvider } from '../contexts/AppBuilderContext';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from '../components/Header';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const dynamic = 'force-dynamic';
function App({ Component, pageProps }) {
  const clerkAppearance = {
    // global Clerk UI theming
    variables: {
      colorPrimary: '#6366F1',
    },
    layout: {
      socialButtonsVariant: 'iconButton',
    },
    elements: {
      card: 'rounded-lg shadow-lg',
      headerTitle: 'text-white',
      buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 rounded-md',
    },
  };
  return (
    <ClerkProvider {...pageProps} appearance={clerkAppearance}>
      <ErrorBoundary>
        <Elements stripe={stripePromise}>
          <ThemeProvider>
            <AnalyticsProvider>
              <AppBuilderProvider>
                <AIProvider>
                  <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
                    <Header />
                    <Component {...pageProps} />
                  </div>
                </AIProvider>
              </AppBuilderProvider>
            </AnalyticsProvider>
          </ThemeProvider>
        </Elements>
      </ErrorBoundary>
    </ClerkProvider>
  );
}

export default App;
