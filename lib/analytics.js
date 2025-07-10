/**
 * Simple analytics tracker stub. Replace with your analytics SDK.
 */
export function trackEvent(event, data) {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track(event, data);
  } else {
    console.log('[Analytics]', event, data);
  }
}
