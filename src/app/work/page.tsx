import type { CSSProperties } from "react";
import { ProjectCover } from "@/components/work/ProjectCover";
import { WorkCatalog, type CatalogItem } from "@/components/work/WorkCatalog";
import { categoryLabels } from "@/lib/format";
import { projectRepository } from "@/lib/repositories";
import { buildMetadata } from "@/lib/seo";
import type { ProjectCategory } from "@/types/domain";
import styles from "./work.module.css";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Eleven projects from 2023 to today: multi-tenant SaaS, AI features in production, B2B commerce, portals, mobile apps and websites.",
  path: "/work",
});

const FILTER_ORDER: ProjectCategory[] = ["ai", "saas", "portal", "commerce", "mobile", "web"];

export default function WorkPage() {
  const projects = projectRepository.getAll();

  const items: CatalogItem[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    period: project.period,
    where: project.client ? `${project.organisation}, for ${project.client}` : project.organisation,
    role: project.role,
    categories: project.categories,
    stack: project.stack,
    lead: project.metrics[0],
  }));

  const covers = Object.fromEntries(
    projects.map((project) => [
      project.slug,
      <ProjectCover
        key={project.slug}
        project={project}
        morph
        sizes="(max-width: 600px) 150vw, (max-width: 860px) 65vw, 600px"
      />,
    ]),
  );

  const filters = FILTER_ORDER.filter((category) =>
    projects.some((project) => project.categories.includes(category)),
  ).map((category) => ({ value: category, label: categoryLabels[category] }));

  return (
    <div className="container">
      <header className={`grid ${styles.header}`}>
        <h1 className={`${styles.title} arrive`}>Work</h1>
        <p className={`${styles.intro} arrive`} style={{ "--i": 1 } as CSSProperties}>
          Eleven projects, newest first. The screens are real, with any customer details blanked out, and so are the
          numbers, roles and decisions.
        </p>
      </header>
      <WorkCatalog items={items} covers={covers} filters={filters} />
    </div>
  );
}
