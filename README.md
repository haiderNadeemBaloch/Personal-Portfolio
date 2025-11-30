# Portfolio - Haider Nadeem

A modern, production-ready personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Three.js.

## Features

- 🎨 **Modern Design**: Clean, responsive design with light/dark theme support
- 🚀 **Performance Optimized**: Code-split heavy libraries, lazy loading, optimized images
- ♿ **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- 🎭 **Animations**: Smooth transitions with Framer Motion (respects reduced motion)
- 🎮 **3D Graphics**: Interactive Three.js hero scene with low-poly floating shapes
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔍 **SEO Optimized**: Metadata, OG cards, sitemap, robots.txt, and structured data
- 🧪 **Tested**: Unit tests with Jest and E2E tests with Playwright
- 🛠️ **Developer Experience**: ESLint, Prettier, Husky, and lint-staged

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (JIT)
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Testing**: Jest, @testing-library/react, Playwright
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-haider-nadeem
```

2. Install dependencies:

```bash
npm ci
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI

## Project Structure

```
portfolio-haider-nadeem/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages (MDX)
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── __tests__/         # Component tests
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HeroScene.tsx
│   ├── ProjectCard.tsx
│   ├── SkipToContent.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── content/               # Content files
│   └── blog/             # MDX blog posts
├── e2e/                  # Playwright E2E tests
├── lib/                  # Utility functions
│   ├── blog.ts
│   ├── projects.ts
│   ├── theme.ts
│   └── utils.ts
├── public/               # Static assets
└── ...config files
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Update Personal Information

1. **Name & Bio**: Edit `app/layout.tsx` and `app/about/page.tsx`
2. **Contact Email**: Update `app/contact/page.tsx` and `app/layout.tsx`
3. **Social Links**: Update `components/Footer.tsx`
4. **Projects**: Edit `lib/projects.ts`
5. **Blog Posts**: Add MDX files to `content/blog/`

### Design Tokens

Edit `tailwind.config.ts` to customize:

- Primary color (#003366)
- Accent color (#FFD700)
- Typography fonts

### Theme

The theme system supports:

- Light mode
- Dark mode
- Auto (system preference)

Users can toggle between modes using the theme toggle in the header.

## Testing

### Unit Tests

```bash
npm run test
```

Tests are located in `components/__tests__/` and use Jest with React Testing Library.

### E2E Tests

```bash
npm run test:e2e
```

E2E tests cover:

- Home page navigation
- Projects page and project details
- Contact form submission

## Code Quality

The project uses:

- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files

Pre-commit hooks automatically run ESLint and Prettier on staged files.

## Performance

- Code splitting for heavy libraries (Three.js)
- Image optimization with `next/image`
- Font optimization with `next/font`
- Lazy loading for non-critical components
- Reduced motion support

## Accessibility

- WCAG AA color contrast
- Skip to content link
- Keyboard navigation
- Visible focus states
- Semantic HTML
- ARIA labels where needed
- Screen reader support

## SEO

- Per-page metadata
- Open Graph tags
- Twitter cards
- Sitemap.xml
- Robots.txt
- Structured data (JSON-LD)

## License

MIT

## Contact

Haider Nadeem

- Email: haider.nadeem7870@gmail.com
- Portfolio: https://haidernadeem.dev
