'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { AboutMe } from '@/components/AboutMe';
import { useEffect, useRef } from 'react';

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
    period: '2024 — Present',
    title: 'UI Engineer',
    company: 'Qavi Technologies',
    description:
      'Designing and building interactive, production-ready interfaces for clients using Next.js, TypeScript, and Tailwind CSS and other technologies.',
  },
  {
    period: '2023 — 2024',
    title: 'Web Developer',
    company: 'Freelance',
    description:
      'Shipped responsive marketing sites, dashboards, and design systems with a strong focus on User Interface and User Experience. Also worked on custom WordPress themes and plugins.',
  },
];

const skills = [
  'HTML',
  'CSS',
  'Sass',
  'Tailwind CSS',
  '3D Animation and scrolling effects',
  'JavaScript',
  'Bootstrap 3, 4, 5',
  'React',
  'Next.js',
  'Figma',
  'Canva Design',
  'Webflow',
  'WordPress',
  'Performance Optimization',
  'SEO',
  'Web Accessibility WCAG 2.1, 2.2',
];

interface EducationItem {
  title: string;
  period: string;
}

const education: EducationItem[] = [
  {
    title: 'Virtual University of Pakistan (BSCS)',
    period: '2024 — Present',
  },
  {
    title: 'Jamia Millia Goverment Degree College',
    period: '2023 - 2024',
  },
  {
    title: 'The Citizen Foundation',
    period: '2012 - 2023',
  },
];

export function AboutContent() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 sm:px-8 sm:py-20">
        <AboutMe
          embedded
          headingLevel="h1"
          headingId="about-heading"
          animate="onMount"
          // showResume
        />
      </div>

      {/* Metrics / Counters (intersecting section) */}
      <section
        aria-label="Key metrics"
        className="dark:to-primary-950 border-y border-gray-100 bg-gradient-to-r from-primary-50 via-white to-accent-50 py-12 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900 sm:py-16"
      >
        <div className="container mx-auto px-4 sm:px-8">
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
            <MetricCard label="Years experience" value={4} />
            <MetricCard label="Clients collaborated with" value={10} />
          </div>
        </div>
      </section>

      {/* Main content sections */}
      <div className="container mx-auto px-4 py-12 sm:px-8 sm:py-20">
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
                  Education
                </motion.h2>
                <div className="space-y-4">
                  {education.map((item) => (
                    <motion.div
                      key={item.title + item.period}
                      variants={staggerVariants}
                      className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                        {item.period}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
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
