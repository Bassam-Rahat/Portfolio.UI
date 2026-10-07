import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCover } from "@/components/work/ProjectCover";
import { categoryLabels, indexLabel } from "@/lib/format";
import { projectRepository } from "@/lib/repositories";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const featured = projectRepository.getFeatured();
  const all = projectRepository.getAll();
  const others = all.filter((project) => !project.featured);

  return (
    <section className={`container ${styles.section}`} aria-labelledby="selected-title">
      <SectionHeader
        id="selected-title"
        title="Selected work"
        aside={<Link href="/work">All {all.length} projects</Link>}
      />
      <ol className={styles.list}>
        {featured.map((project, index) => {
          const lead = project.metrics[0];
          return (
            <li key={project.slug} className={`card card-hover grid ${styles.row}`} data-cover-hover>
              <div className={styles.cover}>
                <ProjectCover project={project} morph />
              </div>
              <div className={styles.body}>
                <div className={styles.top}>
                  <span className={`data ${styles.index}`}>{indexLabel(index)}</span>
                  <ul className="chips" aria-label="Type">
                    {project.categories.map((category) => (
                      <li key={category} className="chip chip-accent">
                        {categoryLabels[category]}
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className={styles.title}>
                  <Link href={`/work/${project.slug}`} className={styles.stretch}>
                    {project.title}
                  </Link>
                </h3>
                <p className={styles.tagline}>{project.tagline}</p>
                {lead ? (
                  <p className={styles.metric}>
                    <Figure value={lead.value} className={styles.metricValue} /> {lead.label}
                  </p>
                ) : null}
                <dl className={styles.facts}>
                  <div>
                    <dt>Where</dt>
                    <dd>{project.client ? `${project.organisation} for ${project.client}` : project.organisation}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd>{project.period}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                </dl>
                <ul className="chips" aria-label="Stack">
                  {project.stack.slice(0, 5).map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
                <span className={styles.cta} aria-hidden="true">
                  Read the case study
                  <span className="round-arrow">→</span>
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      {others.length ? (
        // The rest of the work, named but not shown, so nothing on the page appears twice.
        <Link href="/work" className={`card card-hover ${styles.more}`} aria-label={`See all ${all.length} projects`}>
          <span className={styles.moreCount}>+{others.length}</span>
          <span className={styles.moreText}>
            <span className={styles.moreTitle}>More projects</span>
            <span className={styles.moreNames}>
              {others.map((project, index) => (
                <span key={project.slug}>
                  {index > 0 ? " · " : null}
                  <span className={styles.moreName}>{project.title}</span>
                </span>
              ))}
            </span>
          </span>
          <span className="round-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ) : null}
    </section>
  );
}
