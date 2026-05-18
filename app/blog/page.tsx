import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, tutorials, and insights on web development, motion, and product design.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Journal
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Insights & Tutorials
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Deep dives into UI engineering, animation strategies, and
            performance-minded workflows that power modern web experiences.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {post.coverImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="focus-visible-ring group block"
                  >
                    <h2 className="font-heading text-2xl font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  </Link>
                  <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex gap-4">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="focus-visible-ring text-primary-600 transition hover:text-primary-500 dark:text-primary-400"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
