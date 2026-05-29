'use client';

import Script from 'next/script';
import { hasAnalyticsConsent } from './CookieBanner';

export function AnalyticsPlaceholder() {
  if (!hasAnalyticsConsent()) {
    return null;
  }

  // Replace this with your real analytics snippet once ready.
  return (
    <Script id="analytics-placeholder" strategy="afterInteractive">
      {`// analytics would be initialized here once consent is granted`}
    </Script>
  );
}
