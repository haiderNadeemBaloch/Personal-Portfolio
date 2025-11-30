import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, tutorials, and insights on web development and UI design.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="mb-12 text-center font-heading text-4xl font-bold md:text-5xl">
        Blog
      </h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div className="mx-auto max-w-3xl space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="focus-visible-ring block rounded-md"
              >
                <h2 className="mb-2 font-heading text-2xl font-semibold text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
                  {post.title}
                </h2>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(post.date)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
