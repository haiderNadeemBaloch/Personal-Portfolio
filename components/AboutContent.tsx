'use client';

import { motion } from 'framer-motion';

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
          About Me
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            UI Engineer with 2+ years experience building responsive,
            accessible, and animated web interfaces using Next.js, Tailwind CSS,
            and modern animation libraries.
          </p>
          <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-400">
            I specialize in creating beautiful, performant, and user-friendly
            web experiences. My work focuses on combining modern design
            principles with cutting-edge web technologies to deliver solutions
            that are both visually appealing and functionally robust.
          </p>
          <h2 className="mt-12 font-heading text-2xl font-semibold">
            Skills & Technologies
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Next.js & React</li>
            <li>• TypeScript</li>
            <li>• Tailwind CSS</li>
            <li>• Three.js & WebGL</li>
            <li>• Framer Motion</li>
            <li>• Accessibility (WCAG AA)</li>
            <li>• Performance Optimization</li>
            <li>• SEO Best Practices</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
