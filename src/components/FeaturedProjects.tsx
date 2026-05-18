'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/projects';
import { fadeInUp, listContainerStagger } from '@/lib/animations';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="featured-projects"
      className="bg-white py-20 dark:bg-gray-950"
      aria-labelledby="featured-projects-heading"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="featured-projects-heading"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Featured Projects
        </motion.h2>
        <motion.div
          variants={listContainerStagger(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="focus-visible-ring inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
