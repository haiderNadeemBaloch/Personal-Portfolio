import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 font-heading text-6xl font-bold md:text-8xl">404</h1>
      <h2 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
        Page Not Found
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="focus-visible-ring rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        Go Home
      </Link>
    </div>
  );
}
