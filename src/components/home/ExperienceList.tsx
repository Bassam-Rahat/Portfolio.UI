import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDuration, formatPeriod } from "@/lib/format";
import { experienceRepository, projectRepository } from "@/lib/repositories";
import styles from "./ExperienceList.module.css";

/** "Insignia Business Solutions" → "IB", "Nuclieos" → "N". */
const monogram = (company: string) =>
  company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

/**
 * Career as a timeline: one card per role on a rail, newest first, with the
 * current role marked live and each role's projects one click away.
 */
export function ExperienceList() {
  const positions = experienceRepository.getPositions();

  return (
    <section className={`container ${styles.section}`} aria-labelledby="experience-title">
      <SectionHeader id="experience-title" title="Experience" aside={<Link href="/about">More about me</Link>} />
      <ol className={styles.timeline}>
        {positions.map((position) => {
          const current = position.end === null;
          const projects = position.projectSlugs
            .map((slug) => projectRepository.getBySlug(slug))
            .filter((project) => project !== undefined);

          return (
            <li key={position.id} className={`${styles.item} ${current ? styles.current : ""}`}>
              <span className={styles.dot} aria-hidden="true" />
              <article className={`card card-hover ${styles.card}`}>
                <span className={styles.logo} aria-hidden="true">
                  {monogram(position.company)}
                </span>
                <div className={styles.head}>
                  <h3 className={styles.company}>
                    {position.company}
                    {current ? (
                      <span className={styles.badge}>
                        <span className={styles.live} aria-hidden="true" />
                        Current role
                      </span>
                    ) : null}
                  </h3>
                  <p className={styles.role}>{position.title}</p>
                </div>
                <p className={styles.when}>
                  <span className={styles.period}>{formatPeriod(position.start, position.end)}</span>
                  {position.end ? (
                    <span className={styles.duration}>{formatDuration(position.start, position.end)}</span>
                  ) : null}
                </p>
                <p className={styles.summary}>{position.summary}</p>
                {projects.length ? (
                  <ul className={styles.projects} aria-label={`Projects at ${position.company}`}>
                    {projects.map((project) => (
                      <li key={project.slug}>
                        <Link href={`/work/${project.slug}`}>{project.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
