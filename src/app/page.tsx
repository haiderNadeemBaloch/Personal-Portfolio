import type { Metadata } from 'next';
import { Hero } from '@/src/components/Hero';
import { FeaturedProjects } from '@/src/components/FeaturedProjects';
import { Skills } from '@/src/components/Skills';
import { BlogHighlights } from '@/src/components/BlogHighlights';
import { CTA } from '@/src/components/CTA';
import { getProjects } from '@/lib/projects';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'UI Engineer — Crafting modern, responsive & animated web experiences. Explore my portfolio of projects, skills, and latest blog posts.',
  openGraph: {
    title: 'Haider Nadeem | UI Engineer',
    description:
      'UI Engineer — Crafting modern, responsive & animated web experiences',
  },
};

export default async function HomePage() {
  // Fetch data for SSG
  const [allProjects, allBlogPosts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);

  // Get featured projects (first 3)
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  // Get latest blog posts (first 2)
  const latestPosts = allBlogPosts.slice(0, 2);

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <Skills />
      <BlogHighlights posts={latestPosts} />
      <CTA />
    </>
  );
}
