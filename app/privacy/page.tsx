import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how this site handles basic analytics and respects your privacy choices.',
};

export default function PrivacyPage() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Last updated: December 2025
          </p>
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <p>
              This portfolio uses minimal cookies only for basic, anonymous
              analytics to understand how the site is used. No personally
              identifiable information is collected or sold.
            </p>
            <h2>Cookies & Analytics</h2>
            <p>
              Analytics are only enabled when you explicitly consent via the
              cookie banner. If you decline, analytics remain disabled.
            </p>
            <p>
              You can clear your browser cookies or site data at any time to
              reset your choice.
            </p>
            <h2>Your Data</h2>
            <p>
              When you contact me through the contact form, the information you
              provide is used solely to respond to your message. It is not
              shared or sold to third parties.
            </p>
            <h2>Questions</h2>
            <p>
              If you have any questions about this privacy policy, you can reach
              me at{' '}
              <a href="mailto:haider.nadeem7870@gmail.com">
                haider.nadeem7870@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
