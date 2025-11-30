import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import Link from 'next/link';
import { getProjects } from '@/lib/projects';

export default async function HomePage() {
  const featuredProjects = (await getProjects()).slice(0, 3);

  return (
    <>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">
            Featured Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="focus-visible-ring inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
