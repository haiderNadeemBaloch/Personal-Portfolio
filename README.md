# Portfolio – Haider Nadeem

A modern, production-ready personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **Framer Motion**.  
It includes a 3D hero, projects grid with modal/details, MDX-powered blog, contact form with validation, and full testing/CI setup.

---

## 1. Project overview

- **Home**: 3D hero (`HeroThree`), intro, featured projects, skills, blog highlights, CTA.
- **Projects**:
  - `/projects`: filterable projects grid with animated cards and modal.
  - `/projects/[slug]`: detailed project page with gallery, role, responsibilities, tech list, links.
- **Blog**:
  - MDX posts in `content/blog` with frontmatter (title, date, tags, cover/OG image, excerpt).
  - Listing at `/blog` and MDX-rendered detail pages with syntax highlighting.
- **Contact**: accessible form with client-side validation, API route, success toast, and mailto fallback.
- **About**: detailed bio, metrics counters, experience, education, skills chips.
- **Global**: dark/light theme, cookie consent banner, basic analytics placeholder, SEO (metadata, sitemap, robots, JSON‑LD).

---

## 2. Local development

### Prerequisites

- **Node.js** 20+
- **npm** (comes with Node)

### Install & run

```bash
# install deps
npm ci

# start dev server
npm run dev

# open in browser
http://localhost:3000
```

### Useful scripts

- `npm run dev` – start development server (hot reload).
- `npm run build` – production build.
- `npm start` – run built app (`next start`).
- `npm run lint` – run ESLint.
- `npm run format` – format with Prettier.
- `npm run format:check` – check formatting only.
- `npm test` – Jest unit tests.
- `npm run test:watch` – Jest in watch mode.
- `npm run test:e2e` – Playwright end‑to‑end tests.

---

## 3. Project structure (key files)

```text
app/
  layout.tsx              # Root layout, SEO, header/footer, cookie banner, analytics placeholder
  page.tsx                # Home
  about/page.tsx          # About
  blog/page.tsx           # Blog list
  blog/[slug]/page.tsx    # Blog detail (MDX)
  contact/page.tsx        # Contact form
  projects/page.tsx       # Projects list
  projects/[slug]/page.tsx# Project detail
  privacy/page.tsx        # Privacy policy
  sitemap.ts              # Sitemap generation
  robots.ts               # robots.txt
  api/contact/route.ts    # Contact form API handler

components/
  Footer.tsx
  Header.tsx
  Hero.tsx
  HeroThree.tsx
  FeaturedProjects.tsx
  Skills.tsx
  BlogHighlights.tsx
  ProjectCard.tsx
  ProjectModal.tsx
  ProjectDetailContent.tsx
  CookieBanner.tsx
  AnalyticsPlaceholder.tsx
  mdx/MDXComponents.tsx   # Custom MDX render components
  __tests__/*.test.tsx    # Jest tests

content/
  blog/*.mdx              # MDX posts with frontmatter

lib/
  blog.ts                 # Read MDX posts, metadata, reading time, slugs
  projects.ts             # Seed projects and helpers
  animations.ts           # Shared Framer Motion variants/timings
  utils.ts                # Helpers (cn, formatDate, ...)

e2e/
  home.spec.ts            # Full user-journey Playwright spec

public/
  placeholder.svg         # Default image placeholder
  og-image.jpg            # Default OG image (replace for real site)
```

---

## 4. How to customize the portfolio

### 4.1 Customization checklist (exact files)

Use this as a step‑by‑step list when you fork the project:

1. **Your name & global meta**
   - `app/layout.tsx`
     - `metadata.title.default` – replace `"Haider Nadeem | UI Engineer"` with **YOUR_NAME | Role**.
     - `metadata.description` – replace with your own short bio.
     - `structuredData` object – `name`, `jobTitle`, `description`, `email`, `url`, `sameAs`.

2. **Hero section (Home)**
   - `src/components/Hero.tsx`
     - Change `"Haider Nadeem"` text.
     - Update tagline: `"UI Engineer — Crafting modern, responsive & animated web experiences"`.

3. **About page: long bio & metrics**
   - `components/AboutContent.tsx`
     - Update intro paragraphs (who you are, what you do).
     - Adjust `experienceTimeline` entries (titles, companies, dates, descriptions).
     - Update `education` items (degrees/certs).
     - Edit `skills` array if you want a different skill/tag set.
     - Update `MetricCard` values (projects, years, clients) to your own stats.

4. **Projects data**
   - `lib/projects.ts`
     - Replace each project entry:
       - `slug` – URL slug.
       - `title`, `description`, `longDescription`.
       - `image` – path to your image in `public/` (e.g. `/projects/dashboard.png`).
       - `technologies` – list of tech used.
       - `tags` – `'UI' | 'Frontend' | 'Webflow' | 'WordPress'` etc.
       - `role`, `responsibilities[]`, `gallery[]`.
       - `githubUrl`, `liveUrl`.

5. **Blog posts (MDX)**
   - `content/blog/*.mdx`
     - Each file’s frontmatter:
       - `title`, `date`, `excerpt`, `tags`, `coverImage`, `ogImage`.
     - Replace the sample posts with your own content or add new `.mdx` files.
   - MDX is rendered by `app/blog/[slug]/page.tsx` using `mdx/MDXComponents.tsx`.

6. **Social links & footer text**
   - `components/Footer.tsx`
     - `socialLinks` array – update `href` for GitHub, LinkedIn, Twitter, Behance (or replace with your own).
     - Footer text `"Haider Nadeem"` and tagline.

7. **Header navigation & theme**
   - `components/Header.tsx`
     - `navItems` labels/paths if you adjust pages.
   - `ThemeProvider` (`src/providers/ThemeProvider`) if you want to tweak dark/light behavior.

8. **Contact information**
   - `app/contact/page.tsx`
     - Contact copy and any labels.
     - Ensure the mailto fallback is set to **YOUR_EMAIL**:
       - `href="mailto:haider.nadeem7870@gmail.com"` → replace with your email.
   - `app/layout.tsx` & `app/privacy/page.tsx`
     - Replace `haider.nadeem7870@gmail.com` with your email in structured data and policy text.

9. **Resume link**
   - `components/AboutContent.tsx`
     - The "Download résumé" button links to `/resume.pdf`.
   - Add your actual file at `public/resume.pdf`.

10. **Cookie banner & privacy text**
    - `src/components/CookieBanner.tsx`
      - Adjust wording if needed.
    - `app/privacy/page.tsx`
      - Update the privacy copy to match your real practices.

11. **Colors & design tokens**
    - `tailwind.config.cjs`
      - Extend or override `colors.primary`, `colors.accent`, etc.
    - `globs` in `tailwind.config.cjs` should already cover `app`, `components`, `src`.

12. **OG image & favicon**
    - `public/og-image.jpg` – replace with your real OG image (1200×630 recommended).
    - `public/favicon.ico`, `public/icon.png`, etc. if you want custom icons.

### 4.2 Where to replace placeholder images/content

- **Placeholder images**
  - `public/placeholder.svg` – default used by projects/blog; swap with your own SVG or update `image`/`coverImage` fields to use real assets.
  - `lib/projects.ts` → `image` and `gallery` entries.
  - `content/blog/*.mdx` → `coverImage`/`ogImage` URLs (can be remote Unsplash or local `/blog/...` images).

- **Text content**
  - **Home hero**: `Hero.tsx`.
  - **About**: `AboutContent.tsx`.
  - **Projects**: `lib/projects.ts`.
  - **Blog**: `content/blog/*.mdx`.
  - **Contact copy**: `app/contact/page.tsx`.
  - **Footer tagline**: `components/Footer.tsx`.

---

## 5. Running tests

### Unit tests (Jest + React Testing Library)

```bash
npm test
```

Location:

- `components/__tests__/*.test.tsx`
- `src/components/__tests__/*.test.tsx`

Example coverage:

- `Header.test.tsx` – header/navigation behavior and accessibility.
- `Footer.test.tsx` – footer links and social icons.
- `Hero.test.tsx` – hero wrapper SSR-safety and content.
- `ContactPage.test.tsx` – contact form validation and success flow.

### End‑to‑end tests (Playwright)

```bash
npm run test:e2e
```

The main scenario is in `e2e/home.spec.ts` and covers:

1. Load **Home** and wait for the hero to be visible.
2. Navigate to **Projects**, open the first project, go to project detail.
3. Navigate to **Contact**.
4. Fill and submit the contact form.
5. Assert that the success message toast appears.

---

## 6. Deploying to Vercel

Vercel is the recommended way to deploy this Next.js app.

### 6.1 Prepare the repo

1. Push your forked repo to **GitHub** (or GitLab/Bitbucket if you prefer).
2. Ensure it builds locally:
   ```bash
   npm ci
   npm run build
   ```

### 6.2 Create the Vercel project

1. Go to `https://vercel.com` and log in.
2. Click **"New Project"** → **"Import Git Repository"**.
3. Select your portfolio repository.
4. Vercel will auto-detect **Next.js**:
   - **Framework**: Next.js.
   - **Build command**: `npm run build` (default).
   - **Output directory**: `.next` (default).
5. Click **Deploy**.

### 6.3 Environment variables

This starter does **not require any environment variables** by default.  
If you add analytics, forms, or other services later, configure env vars in:

- **Local**: `.env.local` (not committed).
- **Vercel**: Project → **Settings → Environment Variables**.

### 6.4 After deploy

- Verify pages:
  - `/`, `/about`, `/projects`, `/blog`, `/contact`, `/privacy`.
- Confirm:
  - Dark/light theme toggle works.
  - Cookie banner shows once and respects Accept/Decline.
  - Contact form submits successfully.
  - Blog posts and projects render correctly.

---

## 7. CI (GitHub Actions)

CI is configured in `.github/workflows/ci.yml` to run on push/PR to `main`/`master`:

- **Install**: `npm ci`
- **Lint**: `npm run lint`
- **Unit tests**: `npm test`
- **Build**: `npm run build`
- **E2E tests**: `npx playwright test`

Playwright reports are uploaded as build artifacts.

---

## 8. License & contact

- **License**: MIT
- **Author**: Haider Nadeem
  - Email: `haider.nadeem7870@gmail.com`
  - Portfolio: `https://haidernadeem.dev`
