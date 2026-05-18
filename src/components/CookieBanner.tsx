'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type CookieConsentValue = 'granted' | 'denied' | 'unset';

const STORAGE_KEY = 'cookie-consent';

export function getCookieConsent(): CookieConsentValue {
  if (typeof window === 'undefined') return 'unset';
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === 'granted' || value === 'denied') return value;
  return 'unset';
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === 'granted';
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value: CookieConsentValue) => {
    if (
      typeof window !== 'undefined' &&
      (value === 'granted' || value === 'denied')
    ) {
      window.localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(
        new CustomEvent('cookie-consent-change', { detail: { value } })
      );
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              This site uses cookies for basic analytics.
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              You can change your choice at any time. See our{' '}
              <Link
                href="/privacy"
                className="focus-visible-ring rounded px-0.5 text-primary-600 underline decoration-primary-300 underline-offset-4 dark:text-primary-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleChoice('denied')}
              className="focus-visible-ring rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => handleChoice('granted')}
              className="focus-visible-ring rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
