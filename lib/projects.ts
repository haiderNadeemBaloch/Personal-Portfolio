export type ProjectTag = 'UI' | 'Frontend' | 'Webflow' | 'WordPress';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  tags: ProjectTag[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
  role?: string;
  responsibilities?: string[];
  gallery?: string[];
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
    tags: ['Frontend', 'UI'],
    role: 'Frontend Developer',
    responsibilities: [
      'Designed and implemented responsive UI components',
      'Integrated payment processing with Stripe',
      'Built admin dashboard for inventory management',
      'Optimized performance and accessibility',
    ],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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
    tags: ['Frontend', 'UI'],
    role: 'UI Engineer',
    responsibilities: [
      'Created interactive data visualizations',
      'Implemented responsive dashboard layout',
      'Built customizable widget system',
      'Ensured accessibility compliance',
    ],
    gallery: ['/placeholder.svg', '/placeholder.svg'],
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
    tags: ['Frontend', 'UI'],
    role: 'Full Stack Developer',
    responsibilities: [
      'Designed and developed 3D interactive elements',
      'Implemented smooth page transitions',
      'Built dark mode support',
      'Optimized for SEO and performance',
    ],
    gallery: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-03-10',
  },
  {
    slug: 'webflow-showcase',
    title: 'Webflow Showcase Site',
    description:
      'A beautiful marketing website built with Webflow featuring custom animations and interactions.',
    longDescription:
      'A fully responsive marketing website built entirely in Webflow with custom animations, interactions, and CMS integration. Features include smooth scroll animations, parallax effects, and a fully customizable CMS for content management.',
    image: '/placeholder.svg',
    technologies: ['Webflow', 'CSS', 'JavaScript'],
    tags: ['Webflow', 'UI'],
    role: 'Webflow Developer',
    responsibilities: [
      'Designed and built custom Webflow interactions',
      'Implemented CMS collections',
      'Created responsive layouts',
      'Optimized for performance',
    ],
    gallery: ['/placeholder.svg', '/placeholder.svg'],
    liveUrl: 'https://example.com',
    featured: false,
    date: '2024-03-25',
  },
  {
    slug: 'wordpress-theme',
    title: 'Custom WordPress Theme',
    description:
      'A custom WordPress theme with modern design, Gutenberg blocks, and WooCommerce integration.',
    longDescription:
      'A fully custom WordPress theme built from scratch with modern PHP practices, custom Gutenberg blocks, and seamless WooCommerce integration. Features include a flexible page builder, custom post types, and optimized performance.',
    image: '/placeholder.svg',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'WooCommerce'],
    tags: ['WordPress', 'Frontend'],
    role: 'WordPress Developer',
    responsibilities: [
      'Developed custom WordPress theme',
      'Created custom Gutenberg blocks',
      'Integrated WooCommerce',
      'Optimized for SEO and speed',
    ],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    date: '2024-04-01',
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) || null;
}
