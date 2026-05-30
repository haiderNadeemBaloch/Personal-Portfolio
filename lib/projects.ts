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
  achievements?: string[];
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: 'club-management-platform',
    title: 'Club Management Platform',
    description:
      'Front-end for a multi-sport club platform with dashboards, teams, events, inventory, and sponsors.',
    longDescription:
      'Worked on the front-end of a dynamic web platform for managing multi-sport clubs. The platform allows club administrators and members to view team rosters, match schedules, events, and inventory, while showcasing sponsors and individual club portals.',
    image: '/projects/club-management.png',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Next.js',
      'Bootstrap 5',
      'Sass',
    ],
    tags: ['Frontend', 'UI'],
    role: 'Front-End Developer',
    responsibilities: [
      'Responsive UI design optimized for desktop, tablet, and mobile',
      'Interactive dashboards for members, teams, inventory, events, and match schedules',
      'Event pages and match schedules with real-time updates',
      'Intuitive forms and tables for adding members and assigning them to teams',
      'Visually organized inventory and sponsor display modules',
      'Next.js components, state management, and dynamic rendering for better UX',
    ],
    achievements: [
      'Delivered a secure, responsive front-end suitable for multiple user roles',
      'Created reusable UI components for future scalability',
      'Enhanced user experience and interactivity without exposing confidential brand information',
    ],
    featured: true,
    date: '2023-08-01',
  },
  {
    slug: 'online-scheduling-booking-platform',
    title: 'Online Scheduling & Booking Platform',
    description:
      'Accessible scheduling and booking UI with WCAG-focused improvements and intuitive workflows.',
    longDescription:
      'Contributed to the front-end of a web-based scheduling and booking platform, focusing on accessibility compliance and user-friendly booking interfaces. Enhanced the UI/UX to ensure inclusive access for all users and maintained platform consistency.',
    image: '/projects/scheduling-booking.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap'],
    tags: ['Frontend', 'UI'],
    role: 'Front-End Developer',
    responsibilities: [
      'Accessibility improvements per WCAG 2.1 and 2.2 (keyboard navigation, screen readers, contrast, semantic HTML)',
      'Booking module UI for scheduling workflows',
      'UI consistency fixes, responsive layouts, and interactive element refinements',
      'Cross-device UX with clear feedback and usability focus',
    ],
    achievements: [
      'Delivered a fully accessible front-end aligned with modern accessibility standards',
      'Improved booking module usability for faster, more intuitive scheduling',
      'Resolved minor UI/UX issues to improve reliability and overall experience',
    ],
    featured: true,
    date: '2024-02-01',
  },
  {
    slug: 'green-building-community-platform',
    title: 'Green Building Community & Directory Platform',
    description:
      'Community platform connecting green builders with directory, discussions, articles, and video.',
    longDescription:
      'Contributed to the front-end development and user experience design for a web platform connecting the green building community. The platform includes directories, community interactions, articles, discussions, and video content, providing both members and administrators with an intuitive interface for engagement and content management.',
    image: '/projects/green-building.png',
    technologies: ['HTML5', 'CSS3', 'Next.js', 'Bootstrap'],
    tags: ['Frontend', 'UI'],
    role: 'Front-End Developer',
    responsibilities: [
      'UI/UX for home, directory, community, articles, discussion boards, and video landing pages',
      'Responsive layouts, interactive components, and smooth navigation',
      'Admin pages for home and video modules to support content management',
      'Dynamic directory and community listings, article and discussion views, and video galleries',
      'Consistent design patterns, clear visual hierarchy, and intuitive interactions',
    ],
    achievements: [
      'Delivered a scalable, responsive front-end supporting multiple content types',
      'Improved community engagement through intuitive navigation and interactive UI',
      'Developed reusable components for directory, articles, discussions, and video sections',
    ],
    featured: true,
    date: '2024-06-01',
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) || null;
}
