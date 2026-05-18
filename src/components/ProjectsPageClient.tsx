'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/src/components/ProjectCard';
import { ProjectModal } from '@/src/components/ProjectModal';
import type { Project, ProjectTag } from '@/lib/projects';

interface ProjectsPageClientProps {
  projects: Project[];
}

const allTags: ProjectTag[] = ['UI', 'Frontend', 'Webflow', 'WordPress'];

export function ProjectsPageClient({
  projects: initialProjects,
}: ProjectsPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<ProjectTag | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') {
      return initialProjects;
    }
    return initialProjects.filter((project) =>
      project.tags.includes(selectedTag)
    );
  }, [initialProjects, selectedTag]);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow animation to complete
    setTimeout(() => setSelectedProject(null), 200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
        >
          My Projects
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
          role="tablist"
          aria-label="Filter projects by category"
        >
          <button
            onClick={() => setSelectedTag('All')}
            className={`focus-visible-ring rounded-full px-6 py-2 font-semibold transition-all ${
              selectedTag === 'All'
                ? 'bg-primary-600 text-white shadow-lg dark:bg-primary-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            role="tab"
            aria-selected={selectedTag === 'All'}
            aria-controls="projects-grid"
          >
            All
          </button>
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`focus-visible-ring rounded-full px-6 py-2 font-semibold transition-all ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white shadow-lg dark:bg-primary-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              role="tab"
              aria-selected={selectedTag === tag}
              aria-controls="projects-grid"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            id="projects-grid"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            role="tabpanel"
            aria-label={`Projects filtered by ${selectedTag}`}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onCardClick={handleCardClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400"
          >
            No projects found for this filter.
          </motion.p>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
