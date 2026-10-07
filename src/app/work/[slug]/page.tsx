import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Figure } from "@/components/ui/Figure";
import { ProjectCover } from "@/components/work/ProjectCover";
import { categoryLabels } from "@/lib/format";
import { projectRepository } from "@/lib/repositories";
import { buildMetadata, projectJsonLd, serializeJsonLd } from "@/lib/seo";
import styles from "./case-study.module.css";

/** Every case study is prerendered; unknown slugs fall through to notFound(). */
export function generateStaticParams() {
  return projectRepository.getAll().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectRepository.getBySlug(slug);
  if (!project) return {};
  return buildMetadata({ title: project.title, description: project.summary, path: `/work/${project.slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projectRepository.getBySlug(slug);
  if (!project) notFound();

  const neighbours = projectRepository.getNeighbours(project.slug);
  const where = project.client ? `${project.organisation}, for ${project.client}` : project.organisation;

  return (
    <article className="container">
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/work">All work</Link>
      </nav>

      <header className={`grid ${styles.header}`}>
        <p className={`${styles.kicker} arrive`}>
          {project.categories.map((category) => categoryLabels[category]).join(" · ")}
        </p>
        <h1 className={`${styles.title} arrive`} style={{ "--i": 1 } as CSSProperties}>
          {project.title}
        </h1>
        <p className={`${styles.tagline} arrive`} style={{ "--i": 2 } as CSSProperties}>
          {project.tagline}
        </p>
      </header>

      <dl className={styles.facts}>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{where}</dd>
        </div>
        <div>
          <dt>When</dt>
          <dd className="data">{project.period}</dd>
        </div>
        {project.link ? (
          <div>
            <dt>Live</dt>
            <dd>
              <a href={project.link.href} target="_blank" rel="noopener" className={styles.live}>
                {project.link.label}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.hero}>
        <ProjectCover project={project} variant="hero" morph />
      </div>

      {project.metrics.length ? (
        <section aria-labelledby="outcome-title" className={styles.metricsSection}>
          <h2 id="outcome-title" className="visually-hidden">
            Outcome in numbers
          </h2>
          <ul className={styles.metrics}>
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <p className={styles.metricValue}>
                  <Figure value={metric.value} />
                </p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className={styles.body}>
        <section className={`grid ${styles.block}`} aria-labelledby="overview-title">
          <h2 id="overview-title" className={styles.blockTitle}>
            Overview
          </h2>
          <div className={styles.prose}>
            <p className={styles.lede}>{project.summary}</p>
            <p>{project.context}</p>
          </div>
        </section>

        <section className={`grid ${styles.block}`} aria-labelledby="built-title">
          <h2 id="built-title" className={styles.blockTitle}>
            What I built
          </h2>
          <ol className={styles.steps}>
            {project.contributions.map((item, index) => (
              <li key={item}>
                <span className={`data ${styles.stepIndex}`} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        {project.ai?.length ? (
          <section className={`grid ${styles.block}`} aria-labelledby="ai-title">
            <h2 id="ai-title" className={styles.blockTitle}>
              The AI, and its limits
            </h2>
            <ul className={styles.notes}>
              {project.ai.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={`grid ${styles.block}`} aria-labelledby="stack-title">
          <h2 id="stack-title" className={styles.blockTitle}>
            Stack
          </h2>
          <ul className={`data ${styles.stack}`}>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {neighbours ? (
        <nav aria-label="More projects" className={`grid ${styles.next}`}>
          {[
            { label: "Previous", project: neighbours.previous },
            { label: "Next", project: neighbours.next },
          ].map(({ label, project: other }) => (
            <Link key={label} href={`/work/${other.slug}`} className={styles.nextLink}>
              <span className={styles.nextLabel}>{label}</span>
              <span className={styles.nextTitle}>{other.title}</span>
              <span className={styles.nextTagline}>{other.tagline}</span>
            </Link>
          ))}
        </nav>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd(project)) }} />
    </article>
  );
}
