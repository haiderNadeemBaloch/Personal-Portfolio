import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from '../Hero';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

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

// Mock HeroThree components
jest.mock('../HeroThree', () => {
  const HeroThree = () => <div data-testid="hero-three">Hero Three</div>;
  return {
    __esModule: true,
    default: HeroThree,
    HeroThree,
    HeroThreeFallback: () => (
      <div data-testid="hero-three-fallback">Hero Three Fallback</div>
    ),
  };
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) => {
    const Component = ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => {
      // Filter out framer-motion specific props
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const {
        whileHover,
        whileTap,
        variants,
        initial,
        animate,
        transition,
        ...restProps
      } = props;
      /* eslint-enable @typescript-eslint/no-unused-vars */
      const ComponentTag = tag as keyof JSX.IntrinsicElements;
      return <ComponentTag {...restProps}>{children}</ComponentTag>;
    };
    return Component;
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      h1: createMotionComponent('h1'),
      p: createMotionComponent('p'),
      span: createMotionComponent('span'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Hero', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders without window errors (SSR-safe)', () => {
    // Should not throw during SSR
    expect(() => {
      renderWithTheme(<Hero />);
    }).not.toThrow();
  });

  it('renders the name', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      expect(screen.getByText('Haider Nadeem')).toBeInTheDocument();
    });
  });

  it('renders the tagline', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      expect(
        screen.getByText(/UI Engineer — Crafting modern/i)
      ).toBeInTheDocument();
    });
  });

  it('renders CTA buttons', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      expect(screen.getByText('View Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  it('has accessible links', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      const projectsLink = screen.getByRole('link', { name: 'View Projects' });
      const contactLink = screen.getByRole('link', { name: 'Contact' });

      expect(projectsLink).toHaveAttribute('href', '/projects');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  it('has proper aria labels', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      const section = screen.getByLabelText('Hero section');
      expect(section).toBeInTheDocument();
    });
  });

  it('renders 3D scene when motion is not reduced', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // Not reduced motion
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    renderWithTheme(<Hero />);
    await waitFor(
      () => {
        expect(screen.getByTestId('hero-three')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('renders fallback when motion is reduced', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true, // Reduced motion
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    renderWithTheme(<Hero />);
    await waitFor(() => {
      expect(screen.getByTestId('hero-three-fallback')).toBeInTheDocument();
    });
  });

  it('is fully responsive', async () => {
    renderWithTheme(<Hero />);
    await waitFor(() => {
      const section = screen.getByLabelText('Hero section');
      expect(section).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });
});
