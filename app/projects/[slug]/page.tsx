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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-base leading-relaxed text-gray-700 dark:text-gray-300"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500 dark:bg-primary-400"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const overview = project.longDescription || project.description;

  return (
    <article className="container mx-auto px-4 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="focus-visible-ring mb-8 inline-flex items-center rounded-md text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
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
            aria-hidden
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {project.role && (
              <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/60 dark:text-primary-200">
                {project.role}
              </span>
            )}
            <time
              dateTime={project.date}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {formatDate(project.date)}
            </time>
          </div>
          <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </header>

        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="space-y-12">
          <section aria-labelledby="project-overview-heading">
            <SectionHeading>
              <span id="project-overview-heading">Project Overview</span>
            </SectionHeading>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {overview}
            </p>
          </section>

          {project.responsibilities && project.responsibilities.length > 0 && (
            <section aria-labelledby="project-contributions-heading">
              <SectionHeading>
                <span id="project-contributions-heading">Contributions</span>
              </SectionHeading>
              <BulletList items={project.responsibilities} />
            </section>
          )}

          {project.achievements && project.achievements.length > 0 && (
            <section aria-labelledby="project-achievements-heading">
              <SectionHeading>
                <span id="project-achievements-heading">Key Achievements</span>
              </SectionHeading>
              <BulletList items={project.achievements} />
            </section>
          )}

          <section aria-labelledby="project-technologies-heading">
            <SectionHeading>
              <span id="project-technologies-heading">Technologies Used</span>
            </SectionHeading>
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
          </section>

          {(project.githubUrl || project.liveUrl) && (
            <section className="flex flex-wrap gap-4 border-t border-gray-200 pt-8 dark:border-gray-800">
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
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
