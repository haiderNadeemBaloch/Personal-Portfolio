'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type AboutMeProps = {
  /** Renders only the inner grid (e.g. inside About page layout). */
  embedded?: boolean;
  headingLevel?: 'h1' | 'h2';
  headingId?: string;
  showResume?: boolean;
  /** Home: animate when scrolled into view. About: animate on page load. */
  animate?: 'inView' | 'onMount';
};

const motionTransition = { duration: 0.6, ease: 'easeOut' as const };

export function AboutMe({
  embedded = false,
  headingLevel = 'h2',
  headingId = 'about-me-heading',
  showResume = false,
  animate = 'inView',
}: AboutMeProps = {}) {
  const Heading = headingLevel;

  const motionProps =
    animate === 'onMount'
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: motionTransition,
        }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: motionTransition,
        };

  const innerBgClass = embedded
    ? 'bg-white dark:bg-gray-950'
    : 'bg-white dark:bg-black';

  const content = (
    <motion.div
      {...motionProps}
      className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center"
    >
      <div className="order-2 md:order-1">
        <Heading
          id={headingId}
          className={
            headingLevel === 'h1'
              ? 'mb-4 font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl'
              : 'mb-6 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl'
          }
        >
          About Me
        </Heading>
        <p
          className={
            headingLevel === 'h1'
              ? 'mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300'
              : 'mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg'
          }
        >
          I&apos;m Haider Nadeem, a UI Engineer focused on crafting modern,
          animated, and accessible web experiences. I love turning complex ideas
          into simple, delightful interfaces that feel fast and polished on
          every device.
        </p>
        <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Over the past few years, I&apos;ve worked across dashboards, marketing
          sites, and interactive portfolios—often blending strong visual design
          with performance-focused engineering. My toolbelt revolves around
          Next.js, TypeScript, Tailwind CSS, and Framer Motion, with a growing
          love for 3D experiences powered by Three.js.
        </p>
        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Beyond shipping pixels, I care about structure: reusable components,
          thoughtful API design, and a smooth developer experience. I enjoy
          collaborating closely with designers and product teams to create
          interfaces that feel intentional and timeless.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="focus-visible-ring inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            Let&apos;s collaborate
          </Link>
          {showResume && (
            <a
              href="/resume.pdf"
              className="focus-visible-ring inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Download résumé
            </a>
          )}
        </div>
      </div>

      <div className="order-1 flex justify-center overflow-hidden md:order-2 md:justify-center">
        <div className="relative h-60 w-60 md:h-[17.5rem] md:w-[17.5rem] lg:h-80 lg:w-80">
          <div
            aria-hidden
            className="about-portrait-orbit absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#003366_0%,#FFD700_22%,#66A5CF_45%,#003366_70%,#003366_100%)]"
          />
          <div
            aria-hidden
            className={`absolute inset-[5px] rounded-full ${innerBgClass}`}
          />
          <div
            aria-hidden
            className="about-portrait-orbit-slow pointer-events-none absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(0,51,102,0.55)] ring-2 ring-white dark:ring-black" />
            <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(255,215,0,0.45)] ring-2 ring-white dark:ring-black" />
            <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-400 ring-2 ring-white dark:ring-black" />
            <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-300 ring-2 ring-white dark:ring-black" />
          </div>
          <div className="absolute inset-3 overflow-hidden rounded-full shadow-xl ring-2 ring-gray-200/80 dark:ring-gray-700/80">
            <Image
              src="/haider-portrait.png"
              alt="Portrait of Haider Nadeem"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 216px, 320px"
              priority={!embedded}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (embedded) {
    return <section aria-labelledby={headingId}>{content}</section>;
  }

  return (
    <section
      className="bg-white py-12 dark:bg-black sm:py-20"
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-4 sm:px-8">{content}</div>
    </section>
  );
}
