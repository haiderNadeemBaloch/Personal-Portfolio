'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroThreeFallback } from './HeroThree';

// Lazy load the Three.js component with proper dynamic import
const LazyHeroThree = lazy(() => import('./HeroThree'));

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
      aria-label="Hero section"
    >
      {/* Background 3D Scene or Fallback */}
      {mounted && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {reducedMotion ? (
            <HeroThreeFallback />
          ) : (
            <Suspense
              fallback={
                <div className="dark:from-primary-950 dark:to-accent-950 absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50" />
              }
            >
              <LazyHeroThree
                intensity={1}
                colorTokens={{
                  primary: '#003366',
                  accent: '#FFD700',
                }}
                enableInteraction={true}
              />
            </Suspense>
          )}
        </div>
      )}

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <motion.span
              variants={textVariants}
              className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400"
            >
              Haider Nadeem
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl"
          >
            UI Engineer — Crafting modern, responsive & animated web experiences
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/projects"
                className="focus-visible-ring inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/contact"
                className="focus-visible-ring inline-block rounded-lg border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
