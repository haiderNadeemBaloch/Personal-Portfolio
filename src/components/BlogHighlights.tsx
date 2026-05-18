'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogHighlightsProps {
  posts: BlogPostMeta[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function BlogHighlights({ posts }: BlogHighlightsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog-highlights"
      className="bg-white py-20 dark:bg-gray-950"
      aria-labelledby="blog-highlights-heading"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="blog-highlights-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Latest from the Blog
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-6"
        >
          {posts.slice(0, 2).map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="focus-visible-ring block rounded-md"
              >
                {post.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="mb-2 font-heading text-2xl font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {post.title}
                </h3>
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
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
            href="/blog"
            className="focus-visible-ring inline-block rounded-lg border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
          >
            Read All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
