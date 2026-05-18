import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';

type HeadingProps = ComponentPropsWithoutRef<'h2'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type PreProps = ComponentPropsWithoutRef<'pre'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type ImageProps = ComponentPropsWithoutRef<'img'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const H2 = ({ className = '', ...props }: HeadingProps) => (
  <h2
    className={`mt-12 scroll-m-24 font-heading text-3xl font-semibold text-gray-900 dark:text-white ${className}`}
    {...props}
  />
);

const H3 = ({ className = '', ...props }: HeadingProps) => (
  <h3
    className={`mt-10 scroll-m-24 font-heading text-2xl font-semibold text-gray-900 dark:text-white ${className}`}
    {...props}
  />
);

const Paragraph = ({ className = '', ...props }: ParagraphProps) => (
  <p
    className={`leading-relaxed text-gray-700 dark:text-gray-300 ${className}`}
    {...props}
  />
);

const Anchor = ({ className = '', ...props }: AnchorProps) => (
  <a
    className={`font-semibold text-primary-600 underline-offset-4 transition-colors hover:text-primary-500 dark:text-primary-400 ${className}`}
    {...props}
  />
);

const Pre = ({ className = '', ...props }: PreProps) => (
  <pre
    className={`my-6 overflow-auto rounded-2xl bg-slate-900/95 p-5 text-sm text-slate-100 shadow-inner ${className}`}
    {...props}
  />
);

const Code = ({ className = '', children, ...props }: CodeProps) => {
  const isInline = !className?.includes('language-');

  if (!isInline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code
      className={`rounded-md bg-slate-100 px-1.5 py-0.5 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100 ${className}`}
      {...props}
    >
      {children}
    </code>
  );
};

const ImageComponent = ({ className = '', alt = '', ...props }: ImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className={`my-8 w-full rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800 ${className}`}
    loading="lazy"
    alt={alt}
    {...props}
  />
);

const Blockquote = ({ className = '', ...props }: BlockquoteProps) => (
  <blockquote
    className={`my-8 border-l-4 border-primary-300 pl-6 italic text-gray-700 dark:text-gray-300 ${className}`}
    {...props}
  />
);

export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Anchor,
  pre: Pre,
  code: Code,
  img: ImageComponent,
  blockquote: Blockquote,
};
