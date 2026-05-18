'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
}

function MetricCard({ label, value, suffix = '+' }: MetricCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;

    const controls = animate(count, value, {
      duration: 1.4,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [inView, value, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-gray-200/70 backdrop-blur dark:bg-gray-900/70 dark:ring-gray-800"
    >
      <motion.span
        aria-label={`${value} ${label}`}
        className="block font-heading text-4xl font-bold tracking-tight text-primary-600 dark:text-primary-400"
      >
        <motion.span>{rounded}</motion.span>
        <span aria-hidden="true">{suffix}</span>
      </motion.span>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </motion.div>
  );
}

const experienceTimeline = [
  {
    period: '2023 — Present',
    title: 'UI Engineer',
    company: 'Freelance / Contract',
    description:
      'Designing and building interactive, production-ready interfaces for clients using Next.js, TypeScript, and Tailwind CSS.',
  },
  {
    period: '2021 — 2023',
    title: 'Frontend Developer',
    company: 'Studio & Agency Work',
    description:
      'Shipped responsive marketing sites, dashboards, and design systems with a strong focus on motion and accessibility.',
  },
];

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Three.js',
  'Web Accessibility',
  'Design Systems',
  'Animation',
  'Performance',
  'Node.js',
  'REST APIs',
];

const education = [
  {
    title: 'Bachelors in Computer Science',
    institution: 'Your University Name',
    period: '2018 — 2022',
  },
  {
    title: 'Advanced React & TypeScript',
    institution: 'Online Certifications',
    period: 'Ongoing',
  },
];

export function AboutContent() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-20">
        {/* Hero / Summary */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center"
          aria-labelledby="about-heading"
        >
          <div>
            <h1
              id="about-heading"
              className="mb-4 font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl"
            >
              About Me
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I&apos;m Haider Nadeem, a UI Engineer focused on crafting modern,
              animated, and accessible web experiences. I love turning complex
              ideas into simple, delightful interfaces that feel fast and
              polished on every device.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Over the past few years, I&apos;ve worked across dashboards,
              marketing sites, and interactive portfolios—often blending strong
              visual design with performance-focused engineering. My toolbelt
              revolves around Next.js, TypeScript, Tailwind CSS, and Framer
              Motion, with a growing love for 3D experiences powered by
              Three.js.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Beyond shipping pixels, I care about structure: reusable
              components, thoughtful API design, and a smooth developer
              experience. I enjoy collaborating closely with designers and
              product teams to create interfaces that feel intentional and
              timeless.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="focus-visible-ring inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Let&apos;s collaborate
              </Link>
              <a
                href="/resume.pdf"
                className="focus-visible-ring inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Download résumé
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="flex justify-center md:justify-end">
            <div className="dark:via-primary-950 relative h-56 w-56 overflow-hidden rounded-full border-4 border-primary-500/20 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 shadow-lg dark:border-primary-400/20 dark:from-gray-900 dark:to-accent-900">
              <Image
                src="/placeholder.svg"
                alt="Portrait of Haider Nadeem"
                fill
                className="object-cover"
                sizes="224px"
                priority
              />
            </div>
          </div>
        </motion.section>
      </div>

      {/* Metrics / Counters (intersecting section) */}
      <section
        aria-label="Key metrics"
        className="dark:to-primary-950 border-y border-gray-100 bg-gradient-to-r from-primary-50 via-white to-accent-50 py-16 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              A quick snapshot
            </h2>
            <p className="mb-10 text-sm text-gray-600 dark:text-gray-400 md:text-base">
              Shipping high-quality interfaces, building long-term partnerships,
              and continuously sharpening my craft.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard label="Projects shipped" value={25} />
            <MetricCard label="Years experience" value={2} />
            <MetricCard label="Clients collaborated with" value={10} />
          </div>
        </div>
      </section>

      {/* Main content sections */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Experience & Education */}
          <div className="space-y-16">
            {/* Experience timeline */}
            <section aria-labelledby="experience-heading">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerVariants}
              >
                <motion.h2
                  id="experience-heading"
                  variants={staggerVariants}
                  className="mb-6 font-heading text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
                >
                  Experience
                </motion.h2>
                <div className="space-y-6">
                  {experienceTimeline.map((item) => (
                    <motion.article
                      key={item.title + item.period}
                      variants={staggerVariants}
                      className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                        {item.period}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {item.company}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Education & certifications */}
            <section aria-labelledby="education-heading">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerVariants}
              >
                <motion.h2
                  id="education-heading"
                  variants={staggerVariants}
                  className="mb-6 font-heading text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
                >
                  Education & Certifications
                </motion.h2>
                <div className="space-y-4">
                  {education.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={staggerVariants}
                      className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.institution}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {item.period}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>

          {/* Skills grid */}
          <section aria-labelledby="skills-heading" className="space-y-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerVariants}
            >
              <motion.h2
                id="skills-heading"
                variants={staggerVariants}
                className="mb-4 font-heading text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
              >
                Skills & Focus
              </motion.h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                A snapshot of the tools and areas I work with most frequently.
              </p>
              <motion.div
                variants={staggerVariants}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={staggerVariants}
                    className="dark:bg-primary-950 inline-flex items-center rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800 shadow-sm dark:border-primary-900 dark:text-primary-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
