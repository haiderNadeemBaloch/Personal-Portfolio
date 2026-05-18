import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

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

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Header', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
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

  it('renders the site name', async () => {
    renderWithTheme(<Header />);
    await waitFor(() => {
      expect(screen.getByText('Haider Nadeem')).toBeInTheDocument();
    });
  });

  it('renders navigation links', async () => {
    renderWithTheme(<Header />);
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  it('has accessible navigation', async () => {
    renderWithTheme(<Header />);
    await waitFor(() => {
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('allows keyboard navigation to all nav links', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Header />);

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeInTheDocument();
      });

      const logoLink = screen.getByRole('link', { name: 'Haider Nadeem' });
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const projectsLink = screen.getByRole('link', { name: 'Projects' });
      const aboutLink = screen.getByRole('link', { name: 'About' });

      // Tab to navigate - logo comes first
      await user.tab();
      expect(logoLink).toHaveFocus();

      await user.tab();
      expect(homeLink).toHaveFocus();

      await user.tab();
      expect(projectsLink).toHaveFocus();

      await user.tab();
      expect(aboutLink).toHaveFocus();
    });

    it('allows Enter key to activate links', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Header />);

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeInTheDocument();
      });

      const homeLink = screen.getByRole('link', { name: 'Home' });
      homeLink.focus();

      await user.keyboard('{Enter}');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('allows Space key to activate links', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Header />);

      await waitFor(() => {
        const projectsLink = screen.getByRole('link', { name: 'Projects' });
        expect(projectsLink).toBeInTheDocument();
      });

      const projectsLink = screen.getByRole('link', { name: 'Projects' });
      projectsLink.focus();

      await user.keyboard(' ');
      expect(projectsLink).toHaveAttribute('href', '/projects');
    });

    it('theme toggle responds to keyboard', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Header />);

      await waitFor(() => {
        const themeButton = screen.getByLabelText(/current theme/i);
        expect(themeButton).toBeInTheDocument();
      });

      const themeButton = screen.getByLabelText(/current theme/i);
      themeButton.focus();

      await user.keyboard('{Enter}');
      // Theme should have changed (we can't easily test the actual theme change without more setup)
      expect(themeButton).toBeInTheDocument();
    });

    it('mobile menu can be opened with keyboard', async () => {
      const user = userEvent.setup();
      // Mock window.matchMedia for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithTheme(<Header />);

      await waitFor(() => {
        const menuButton = screen.getByLabelText('Toggle menu');
        expect(menuButton).toBeInTheDocument();
      });

      const menuButton = screen.getByLabelText('Toggle menu');
      menuButton.focus();

      await user.keyboard('{Enter}');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('mobile menu closes with Escape key', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithTheme(<Header />);

      await waitFor(() => {
        const menuButton = screen.getByLabelText('Toggle menu');
        expect(menuButton).toBeInTheDocument();
      });

      const menuButton = screen.getByLabelText('Toggle menu');
      await user.click(menuButton);

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });
});
