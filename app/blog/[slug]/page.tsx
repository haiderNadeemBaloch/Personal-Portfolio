import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20">
      <Link
        href="/blog"
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
        Back to Blog
      </Link>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          {post.title}
        </h1>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
          {formatDate(post.date)}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
}
