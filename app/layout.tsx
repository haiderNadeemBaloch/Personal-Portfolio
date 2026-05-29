import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { AnalyticsPlaceholder } from '@/components/AnalyticsPlaceholder';
import Script from 'next/script';

const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://haidernadeem.dev'),
  title: {
    default: 'Haider Nadeem | UI Engineer',
    template: '%s | Haider Nadeem',
  },
  description:
    'UI Engineer with 2+ years experience building responsive, accessible, and animated web interfaces using Next.js, Tailwind CSS, and modern animation libraries.',
  keywords: [
    'UI Engineer',
    'Frontend Developer',
    'Next.js',
    'React',
    'Web Development',
  ],
  authors: [{ name: 'Haider Nadeem' }],
  creator: 'Haider Nadeem',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://haidernadeem.dev',
    siteName: 'Haider Nadeem Portfolio',
    title: 'Haider Nadeem | UI Engineer',
    description:
      'UI Engineer — Crafting modern, responsive & animated web experiences',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Haider Nadeem Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haider Nadeem | UI Engineer',
    description:
      'UI Engineer — Crafting modern, responsive & animated web experiences',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Haider Nadeem',
  jobTitle: 'UI Engineer',
  description:
    'UI Engineer with 2+ years experience building responsive, accessible, and animated web interfaces',
  email: 'haider.nadeem7870@gmail.com',
  url: 'https://haidernadeem.dev',
  sameAs: [
    'https://github.com',
    'https://linkedin.com',
    'https://twitter.com',
    'https://behance.net',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CookieBanner />
          <AnalyticsPlaceholder />
        </ThemeProvider>
      </body>
    </html>
  );
}
