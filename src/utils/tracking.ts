// Google Analytics and Facebook Pixel conversion tracking utility

export const trackConversion = (label: string) => {
  // Google Analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/LABEL', // Placeholder
      'event_category': 'signup',
      'event_label': label
    });
    (window as any).gtag('event', 'sign_up', {
      method: 'landing_page'
    });
  }
};

export const trackFreeTrialConversion = () => {
  // Google Analytics - tracks button clicks (app sends actual conversions)
  trackConversion('free_trial');
};
