import type { Metadata } from "next";
import { profile } from "@/content/profile";
import type { Project } from "@/types/domain";

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
}

/** Builds consistent per-page metadata (canonical URL, Open Graph, Twitter). */
export function buildMetadata({ title, description = profile.intro, path = "/" }: PageMetaInput = {}): Metadata {
  // The root layout's title template appends the name, so pages pass only their own title.
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.role}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      siteName: profile.name,
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Escapes `<` so the payload cannot close the surrounding script tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: profile.siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    sameAs: [profile.links.linkedin, profile.links.github, profile.links.stackoverflow],
    knowsAbout: ["C#", ".NET", "ASP.NET Core", "Angular", "Next.js", "Anthropic Claude", "Multi-tenant SaaS"],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${profile.siteUrl}/work/${project.slug}`,
    creator: { "@type": "Person", name: profile.name },
    keywords: project.stack.join(", "),
    ...(project.link ? { sameAs: project.link.href } : {}),
  };
}
