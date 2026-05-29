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
    const year = new Date().getFullYear();
    const { getByText } = render(<Footer />);
    expect(
      getByText(new RegExp(`© ${year} Haider Nadeem\\. All rights reserved\\.`))
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

  it('renders GitHub link', () => {
    const { getByLabelText } = render(<Footer />);
    const github = getByLabelText(/visit github/i);
    expect(github).toBeInTheDocument();
    expect(github).toHaveAttribute(
      'href',
      'https://github.com/haiderNadeemBaloch/'
    );
  });

  it('renders LinkedIn link', () => {
    const { getByLabelText } = render(<Footer />);
    const linkedIn = getByLabelText(/visit linkedin/i);
    expect(linkedIn).toBeInTheDocument();
    expect(linkedIn).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/haider-nadeem-1b0980369/'
    );
  });
});
