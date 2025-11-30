import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { ThemeProvider } from '../ThemeProvider';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock HeroScene (Three.js components)
jest.mock('../HeroScene', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-scene">Hero Scene</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Hero', () => {
  it('renders the main heading', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText(/hi, i'm/i)).toBeInTheDocument();
    expect(screen.getByText('Haider Nadeem')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    renderWithTheme(<Hero />);
    expect(
      screen.getByText(/UI Engineer — Crafting modern/i)
    ).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('View My Work')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });
});
