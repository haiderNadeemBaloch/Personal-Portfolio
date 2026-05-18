import type { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import { ProjectsPageClient } from '@/src/components/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web development projects built with modern technologies.',
};

// Server component wrapper for metadata and data fetching
export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsPageClient projects={projects} />;
}
