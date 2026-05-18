import { render } from '@testing-library/react';
import { Footer } from '../Footer';

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

describe('Footer', () => {
  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('renders the site name', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Haider Nadeem')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    const { getByText } = render(<Footer />);
    expect(
      getByText(/© 2025 Haider Nadeem\. All rights reserved\./)
    ).toBeInTheDocument();
  });

  it('renders sitemap links', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Projects')).toBeInTheDocument();
    expect(getByText('Blog')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
  });

  it('renders social links', () => {
    const { getByLabelText } = render(<Footer />);
    expect(getByLabelText(/visit github/i)).toBeInTheDocument();
    expect(getByLabelText(/visit linkedin/i)).toBeInTheDocument();
    expect(getByLabelText(/visit twitter/i)).toBeInTheDocument();
    expect(getByLabelText(/visit behance/i)).toBeInTheDocument();
  });
});
