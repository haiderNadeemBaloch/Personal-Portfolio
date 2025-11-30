import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'Behance', href: 'https://behance.net', icon: 'behance' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">
              Haider Nadeem
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              UI Engineer — Crafting modern, responsive & animated web
              experiences
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/about"
                  className="focus-visible-ring rounded-md px-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="focus-visible-ring rounded-md px-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="focus-visible-ring rounded-md px-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="focus-visible-ring rounded-md px-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <ul className="flex gap-4" role="list">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name} profile`}
                    className="focus-visible-ring rounded-md p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Haider Nadeem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
