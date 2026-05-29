import { Hero } from '@/components/Hero';
import { AboutMe } from '@/components/AboutMe';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { FeaturedBlogs } from '@/components/FeaturedBlogs';
import { getProjects } from '@/lib/projects';
import { getBlogPosts } from '@/lib/blog';

export default async function HomePage() {
  const [allProjects, allBlogPosts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);
  const featuredProjects = allProjects.slice(0, 3);
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
