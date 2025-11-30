import type { Metadata } from 'next';
import { AboutContent } from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Haider Nadeem, a UI Engineer with 2+ years of experience building modern web interfaces.',
};

export default function AboutPage() {
  return <AboutContent />;
}
