import type { CSSProperties } from "react";
import Link from "next/link";
import { profile, skillGroups } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPeriod } from "@/lib/format";
import { experienceRepository, projectRepository } from "@/lib/repositories";
import { buildMetadata, personJsonLd, serializeJsonLd } from "@/lib/seo";
import styles from "./about.module.css";

export const metadata = buildMetadata({
  title: "About",
  description: `${profile.role} in Lahore. Experience, skills and how I work.`,
  path: "/about",
});

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: personJsonLd(),
};

export default function AboutPage() {
  const positions = experienceRepository.getPositions();

  return (
    <div className="container">
      <header className={`grid ${styles.header}`}>
        <h1 className={`${styles.title} arrive`}>About</h1>
        <p className={`${styles.lede} arrive`} style={{ "--i": 1 } as CSSProperties}>
          {profile.intro}
        </p>
      </header>

      <div className={`grid ${styles.story}`}>
        <div className={styles.prose}>
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <aside className={styles.facts} aria-label="Quick facts">
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {profile.education.degree}
                <br />
                <span className="muted">{profile.education.school}</span>
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{profile.languages.join(", ")}</dd>
            </div>
            <div>
              <dt>Résumé</dt>
              <dd>
                <a href={profile.resumePath} target="_blank" rel="noopener">
                  Download the PDF
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className={styles.section} aria-labelledby="career-title">
        <SectionHeader id="career-title" title="Experience" />
        <ol className={styles.career}>
          {positions.map((position) => (
            <li key={position.id} className={`grid ${styles.position}`}>
              <div className={styles.when}>
                <p className="data">{formatPeriod(position.start, position.end)}</p>
                <p className={styles.place}>{position.location}</p>
              </div>
              <div className={styles.what}>
                <h3 className={styles.company}>{position.company}</h3>
                <p className={styles.role}>{position.title}</p>
                <p className={styles.summary}>{position.summary}</p>
                <ul className={styles.highlights}>
                  {position.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.projects}>
                <p className={styles.projectsLabel}>Projects</p>
                <ul>
                  {position.projectSlugs.map((slug) => {
                    const project = projectRepository.getBySlug(slug);
                    return project ? (
                      <li key={slug}>
                        <Link href={`/work/${slug}`}>{project.title}</Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="skills-title">
        <SectionHeader id="skills-title" title="Tools I use" />
        <dl className={styles.skills}>
          {skillGroups.map((group) => (
            <div key={group.name} className="grid">
              <dt className={styles.skillName}>{group.name}</dt>
              <dd className={styles.skillItems}>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }} />
    </div>
  );
}
