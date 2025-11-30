import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web development projects built with modern technologies.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="mb-12 text-center font-heading text-4xl font-bold md:text-5xl">
        My Projects
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
