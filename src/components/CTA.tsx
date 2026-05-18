'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary-600 to-accent-500 py-20 dark:from-primary-700 dark:to-accent-600"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="cta-heading"
            className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          >
            Let&apos;s Work Together
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/contact"
                className="focus-visible-ring inline-block rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-colors hover:bg-gray-100 dark:text-primary-700"
              >
                Get In Touch
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/projects"
                className="focus-visible-ring inline-block rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View My Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
