# Bassam Rahat — portfolio

Personal portfolio built with Next.js 16 (App Router, Cache Components) and React 19.
Every page is rendered on the server and prerendered at build time from static content; the
browser only runs JavaScript for the theme switch, the project filters and the local clock.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; prints which routes are static
npm start        # serve the production build
npm run lint
```

The public address (canonical URLs, sitemap, JSON-LD, Open Graph images) comes from
`NEXT_PUBLIC_SITE_URL` if set, otherwise from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a
Vercel deployment needs no configuration. Set `NEXT_PUBLIC_SITE_URL` when hosting elsewhere.

## Editing content

All content is plain TypeScript in `src/content`. Nothing in `src/app` or `src/components`
needs to change to add or edit a project.

| File | What it holds |
| --- | --- |
| `src/content/profile.ts` | Name, intro, about text, headline figures ("ledger"), capabilities, skills, navigation |
| `src/content/projects.ts` | Every case study: summary, context, contributions, AI notes, metrics, stack, live link |
| `src/content/experience.ts` | Employment history and which projects belong to each role |
| `public/bassam-rahat-resume.pdf` | The résumé linked from the header, footer and About page |

A project with `featured: true` appears in "Selected work" on the home page. Projects are
ordered newest first by `sortYear`.

## Architecture

```
src/
  app/                      Routes (server components) and metadata files
    page.tsx                Home
    work/page.tsx           All projects, filterable
    work/[slug]/page.tsx    Case study (prerendered for every slug)
    about/page.tsx          About, full experience, skills
    opengraph-image.tsx     Social card for the home page (+ one per case study)
    sitemap.ts, robots.ts   Search engine files
  components/
    layout/                 Header, footer, theme switch (+ its external store)
    home/                   Home page sections
    work/                   Project cover and catalogue
    ui/                     Small shared pieces (section header, figure, clock)
  content/                  Static content (the "CMS")
    screens/                Project screenshots, cleared of personal data
  lib/
    repositories/           Data access behind interfaces
    cover.ts                Seeded project cover design (glow, chart)
    seo.ts, og.tsx          Metadata, JSON-LD, Open Graph rendering
  types/domain.ts           Domain model
```

### Patterns

- **Repository pattern.** Pages read content through `ProjectRepository` and
  `ExperienceRepository` interfaces (`src/lib/repositories`). `index.ts` is the composition
  root that binds them to the static implementations, so the data source can move to a CMS or
  database by changing one file.
- **Server-first rendering.** Components are React Server Components by default. Client
  components (`"use client"`) are small islands that receive already-rendered markup as props
  (for example, the work catalogue receives server-drawn covers).
- **External store for theme.** The theme switch reads `localStorage` through
  `useSyncExternalStore`; an inline script sets the theme before first paint, so there is no
  flash of the wrong theme.
- **Builders for metadata.** `buildMetadata` and the JSON-LD helpers keep titles, canonical
  URLs, Open Graph and structured data consistent across routes.
- **Design tokens.** Colours, type scale, spacing and motion live as CSS custom properties in
  `src/app/globals.css`; components use CSS Modules on top of them.

### Next.js 16 notes

- `cacheComponents` is enabled, so route segment configs such as `dynamic` and `dynamicParams`
  are not used. Case studies use `generateStaticParams` and call `notFound()` for unknown slugs.
- Pages never read the current time during rendering (it would make them dynamic). The footer
  shows a fixed "Updated" string, and the Lahore clock renders only in the browser.
- Open Graph images load their fonts from `assets/fonts` inside a `"use cache"` function, so
  they are prerendered at build time.

## Design

- **Type:** Hubot Sans (headings, bold and slightly expanded), Mona Sans (text, UI and figures),
  Fragment Mono (data only). Figures use Mona Sans because Hubot's zero carries a slash.
- **Colour:** dark-first. Near-black surfaces with one accent, "signal orange" (`#FF6A3D`, and
  `#CF3D14` in the light theme so white button text passes WCAG AA). The light theme is its own
  palette, not an inversion. Theme follows the system by default; visitors can choose Auto, Light or Dark.
- **Hero:** the name is the only `h1` and the largest element on the page, with the statement,
  intro and two calls to action beside a "product shot": a stack of floating cards built from real
  project facts (a SupportDesk inbox with Claude sentiment tags, ~10,000 tickets a month,
  20.5s → 1.1s). The stack is tilted in 3D and straightens on hover; inside it, the bars grow in,
  the sentiment tags appear one by one, the "after" bar shrinks to its real length and a light
  travels around the inbox border. The background is a single soft wash of light; no textures.
  On small screens the cards lie flat, stop overlapping and stack neatly.
- **Header:** a floating glass capsule with a "BR" monogram; the full name sits beside it on inner
  pages, but not on the home page, where the hero already shows it.
- **Covers:** each project gets a product-style cover: an app window, with the project's
  address, over a soft glow. Each project picks its scene in `src/content/projects.ts` (`cover`):
  a real screenshot (`src/content/screens`), real code, a chart with one of its real figures, or
  a chat, shop, table, file list, pair of phones or web page drawn in placeholder shapes. Nothing
  on a cover is invented data. Screenshots are statically imported, so Next.js sizes, converts
  and caches them; card covers show them zoomed in, case studies show the full width.
- **Screenshots must be cleaned first.** Before a screen goes into `screens/`, replace every
  customer, agent and client name, ticket or order reference, email content and trade price with
  neutral placeholder bars (see `supportdesk-tickets.png`). Public marketing pages need no changes.
- **Motion:** one staggered arrival per page, and a shared-element morph between a
  project's cover and its case study (React `<ViewTransition>`). Everything respects reduced motion.
- **Accessibility:** skip link, landmarks, one `h1` per page, visible focus rings, real radio
  buttons for the theme, `aria-pressed` filters, AA colour contrast in both themes.
