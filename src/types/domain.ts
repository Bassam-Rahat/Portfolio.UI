/**
 * Domain model for the portfolio.
 * Content lives in `src/content` and is only ever read through the repositories
 * in `src/lib/repositories`, so the source can later move to a CMS without
 * touching any page or component.
 */

export type ProjectCategory = "ai" | "saas" | "portal" | "commerce" | "mobile" | "web";

export interface Metric {
  /** The figure itself, e.g. "10,000" or "20.5s → 1.1s". */
  value: string;
  /** What the figure measures, e.g. "tickets a month". */
  label: string;
}

/**
 * A screenshot, as returned by a static image import. Screens must be cleared
 * of personal and commercial data before they are added.
 */
export interface ScreenImage {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

/**
 * What the app window on a project's cover shows: a real screen, real code, a
 * real figure over a chart ("chart", picked by its index in `metrics`), or
 * placeholder shapes that suggest the kind of product.
 */
export type CoverScene =
  | { kind: "screenshot"; image: ScreenImage }
  | { kind: "code"; source?: string }
  | { kind: "chart"; metric: number }
  | { kind: "chat" | "shop" | "table" | "files" | "phones" | "page" };

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line, shown in lists. */
  tagline: string;
  /** Two or three sentences, shown at the top of the case study. */
  summary: string;
  /** Display string such as "2026" or "2023 – 2025". */
  period: string;
  /** Sort key: the year the work ended (or the current year if ongoing). */
  sortYear: number;
  /** Where the work was done: an employer, or "Independent". */
  organisation: string;
  client?: string;
  role: string;
  categories: ProjectCategory[];
  cover: CoverScene;
  stack: string[];
  metrics: Metric[];
  /** Why the project existed, in plain words. */
  context: string;
  /** What was built and how, one item per contribution. */
  contributions: string[];
  /** How AI is used, including privacy and human-review safeguards. */
  ai?: string[];
  link?: ExternalLink;
  featured: boolean;
}

export interface Position {
  id: string;
  company: string;
  title: string;
  location: string;
  /** ISO year-month, e.g. "2025-09". */
  start: string;
  /** ISO year-month, or null while current. */
  end: string | null;
  summary: string;
  highlights: string[];
  projectSlugs: string[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Display form, e.g. "+92 323 4839988"; see `telHref` for the link. */
  phone: string;
  /** Short positioning statement used in the hero and metadata. */
  headline: string;
  /** The ending of the headline to set in the accent colour; must appear in `headline`. */
  headlineEmphasis: string;
  intro: string;
  about: string[];
  education: { degree: string; school: string; period: string };
  languages: string[];
  links: {
    linkedin: string;
    github: string;
    stackoverflow: string;
  };
  resumePath: string;
  siteUrl: string;
  /** Headline figures for the home page ledger. */
  ledger: (Metric & { proof: string })[];
  /** Shown in the footer; a plain string so prerendered pages never read the clock. */
  updated: string;
}

export interface Capability {
  title: string;
  /** Picks the card's icon. */
  icon: "backend" | "frontend" | "ai";
  /** One short line a visitor can take in at a glance. */
  promise: string;
  /** Three points of a few words each. */
  points: string[];
  /** Technologies, shown as chips. */
  tools: string[];
  /** Gives the card extra emphasis. */
  highlight?: boolean;
  /** Slugs of the case studies that prove it. */
  proof: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
