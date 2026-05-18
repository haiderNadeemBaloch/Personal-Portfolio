import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrismPlus from 'rehype-prism-plus';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { mdxComponents } from '@/src/components/mdx/MDXComponents';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://haidernadeem.dev';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: post.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="focus-visible-ring mb-6 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          ← Back to Blog
        </Link>

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
          </div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>

          {post.coverImage && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-gray-200 shadow-lg dark:border-gray-800">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mdx-content prose prose-lg prose-slate dark:prose-invert mt-12 max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
                },
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
