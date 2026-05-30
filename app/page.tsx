import { Hero } from '@/components/Hero';
import { AboutMe } from '@/components/AboutMe';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { FeaturedBlogs } from '@/components/FeaturedBlogs';
import { getFeaturedProjects } from '@/lib/projects';
import { getBlogPosts } from '@/lib/blog';

export default async function HomePage() {
  const [featuredProjects, allBlogPosts] = await Promise.all([
    getFeaturedProjects(),
    getBlogPosts(),
  ]);
  const featuredBlogs = allBlogPosts.slice(0, 3);

  return (
    <>
      <Hero />
      <AboutMe />
      <FeaturedProjects projects={featuredProjects} />
      <FeaturedBlogs posts={featuredBlogs} />
    </>
  );
}
