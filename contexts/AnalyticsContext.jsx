import { useEffect, createContext } from 'react';
import { useUser } from '@clerk/nextjs';
import { trackEvent } from '../lib/analytics';

export const AnalyticsContext = createContext();

/**
 * Fires analytics events on login/logout.
 */
export function AnalyticsProvider({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      trackEvent('user_signed_in', { userId: user.id });
    } else {
      trackEvent('user_signed_out', {});
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <AnalyticsContext.Provider value={{}}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
