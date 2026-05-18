import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Header', () => {
  it('renders the site name', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Haider Nadeem')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has accessible navigation', () => {
    renderWithTheme(<Header />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });
});
