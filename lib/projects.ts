export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A modern, full-featured e-commerce platform with cart management, checkout flow, and admin dashboard.',
    longDescription:
      'Built with Next.js and TypeScript, this e-commerce platform features a complete shopping experience with product catalog, cart management, secure checkout, and an admin dashboard for inventory management. The platform includes real-time inventory updates, payment integration, and order tracking.',
    image: '/placeholder.svg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Prisma'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-01-15',
  },
  {
    slug: 'dashboard-analytics',
    title: 'Analytics Dashboard',
    description:
      'Real-time analytics dashboard with interactive charts, data visualization, and customizable widgets.',
    longDescription:
      'A comprehensive analytics dashboard that provides real-time insights through interactive charts and data visualizations. Features include customizable widgets, date range filtering, export functionality, and responsive design that works seamlessly across all devices.',
    image: '/placeholder.svg',
    technologies: ['React', 'TypeScript', 'D3.js', 'Recharts', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-02-20',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'A stunning portfolio website with 3D animations, smooth transitions, and dark mode support.',
    longDescription:
      'This portfolio website showcases my work with beautiful 3D animations powered by Three.js, smooth page transitions using Framer Motion, and full dark mode support. The site is fully accessible, SEO-optimized, and performs excellently across all devices.',
    image: '/placeholder.svg',
    technologies: [
      'Next.js',
      'Three.js',
      'Framer Motion',
      'TypeScript',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-03-10',
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) || null;
}
