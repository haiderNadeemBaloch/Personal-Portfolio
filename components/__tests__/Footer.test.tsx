import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders the site name', () => {
    render(<Footer />);
    expect(screen.getByText('Haider Nadeem')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/visit github/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/visit linkedin/i)).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
  });
});
