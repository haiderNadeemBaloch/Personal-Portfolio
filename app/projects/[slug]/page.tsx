import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject, getProjects } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20">
      <Link
        href="/projects"
        className="focus-visible-ring mb-8 inline-flex items-center rounded-md px-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-5 w-5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          {project.title}
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          {formatDate(project.date)}
        </p>

        <div className="relative mb-12 h-96 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            {project.longDescription || project.description}
          </p>

          <h2 className="mt-12 font-heading text-2xl font-semibold">
            Technologies Used
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-12 flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible-ring rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible-ring rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
