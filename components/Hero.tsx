'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Scene = lazy(() => import('./HeroScene'));

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {mounted && !reducedMotion && (
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="dark:from-primary-950 dark:to-accent-950 absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50" />
            }
          >
            <Scene />
          </Suspense>
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400">
              Haider Nadeem
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-700 dark:text-gray-300 md:text-2xl">
            UI Engineer — Crafting modern, responsive & animated web experiences
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/projects"
                className="focus-visible-ring rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                View My Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="focus-visible-ring rounded-lg border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
