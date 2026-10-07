import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projectRepository } from "@/lib/repositories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const pages = ["", "/work", "/about"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projectRepository.getAll().map((project) => ({
    url: `${base}/work/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.7 : 0.5,
  }));
  return [...pages, ...caseStudies];
}
