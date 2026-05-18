import RSS from 'rss';
import { getBlogPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://haidernadeem.dev';

export async function GET() {
  const posts = await getBlogPosts();

  const feed = new RSS({
    title: 'Haider Nadeem — UI Engineering Notes',
    description:
      'Articles about UI engineering, motion design, and modern web development.',
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss`,
    language: 'en',
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      guid: `${SITE_URL}/blog/${post.slug}`,
      date: post.date,
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
