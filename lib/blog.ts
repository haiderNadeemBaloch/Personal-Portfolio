import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  ogImage: string;
  readingTime: string;
  readingTimeMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'blog');
const FALLBACK_OG_IMAGE =
  'https://dummyimage.com/1200x630/0f172a/ffffff&text=Haider+Nadeem';

function humanizeSlug(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function deriveTitle(content: string, slug: string) {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? humanizeSlug(slug);
}

function deriveExcerpt(content: string) {
  for (const line of content.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || t.startsWith('```')) continue;
    if (t.startsWith('>')) return t.replace(/^>\s*/, '').slice(0, 220);
    return t.slice(0, 220);
  }
  return '';
}

function parsePost(fileName: string): BlogPost {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const slug = fileName.replace(/\.mdx$/, '');
  const fileDate = fs.statSync(fullPath).mtime.toISOString().split('T')[0];

  const tags = Array.isArray(data.tags)
    ? (data.tags as string[])
    : data.tags
      ? [data.tags]
      : [];

  const coverImage = data.coverImage as string | undefined;

  return {
    slug,
    title: (data.title as string) || deriveTitle(content, slug),
    date: (data.date as string) || fileDate,
    excerpt: (data.excerpt as string) || deriveExcerpt(content),
    tags,
    coverImage,
    ogImage: coverImage || (data.ogImage as string) || FALLBACK_OG_IMAGE,
    readingTime: stats.text,
    readingTimeMinutes: Math.ceil(stats.minutes),
    content,
  };
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((fileName) => parsePost(fileName));

    return posts
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(({ content: _content, ...meta }) => meta);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    return parsePost(`${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
