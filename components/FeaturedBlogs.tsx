'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/BlogCard';
import type { BlogPostMeta } from '@/lib/blog';
import { fadeInUp, listContainerStagger } from '@/lib/animations';

interface FeaturedBlogsProps {
  posts: BlogPostMeta[];
}

export function FeaturedBlogs({ posts }: FeaturedBlogsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="featured-blogs"
      className="bg-white py-12 dark:bg-gray-950 sm:py-20"
      aria-labelledby="featured-blogs-heading"
    >
      <div className="container mx-auto px-4 sm:px-8">
        <motion.h2
          id="featured-blogs-heading"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Featured Blogs
        </motion.h2>
        <motion.div
          variants={listContainerStagger(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
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
            className="focus-visible-ring inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            View All Blogs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
