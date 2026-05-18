'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

interface ProjectDetailContentProps {
  project: Project;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const roleInView = useInView(roleRef, { once: true, amount: 0.3 });
  const techInView = useInView(techRef, { once: true, amount: 0.3 });
  const linksInView = useInView(linksRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section with Gallery */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 py-20">
          <motion.div variants={fadeInUp} className="mb-8">
            <Link
              href="/projects"
              className="focus-visible-ring mb-6 inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="mb-4 font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {formatDate(project.date)}
            </p>
          </motion.div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 dark:text-white">
              About This Project
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {project.longDescription || project.description}
            </p>
          </motion.section>

          {/* Role & Responsibilities */}
          {project.role && (
            <motion.section
              ref={roleRef}
              initial="hidden"
              animate={roleInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="mb-4 font-heading text-3xl font-bold text-gray-900 dark:text-white"
              >
                My Role
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mb-6 text-lg font-semibold text-primary-600 dark:text-primary-400"
              >
                {project.role}
              </motion.p>
              {project.responsibilities &&
                project.responsibilities.length > 0 && (
                  <motion.ul variants={staggerContainer} className="space-y-3">
                    {project.responsibilities.map((responsibility, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start text-gray-600 dark:text-gray-400"
                      >
                        <svg
                          className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{responsibility}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
            </motion.section>
          )}

          {/* Technologies */}
          <motion.section
            ref={techRef}
            initial="hidden"
            animate={techInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-6 font-heading text-3xl font-bold text-gray-900 dark:text-white"
            >
              Technologies Used
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-3"
            >
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  variants={fadeInUp}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.section>

          {/* Links */}
          <motion.section
            ref={linksRef}
            initial="hidden"
            animate={linksInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-6 font-heading text-3xl font-bold text-gray-900 dark:text-white"
            >
              Project Links
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-4"
            >
              {project.liveUrl && (
                <motion.a
                  variants={fadeInUp}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible-ring inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  variants={fadeInUp}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible-ring inline-flex items-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View on GitHub
                </motion.a>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
