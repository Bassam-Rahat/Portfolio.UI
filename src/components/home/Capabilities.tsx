import Link from "next/link";
import type { ReactNode } from "react";
import { capabilities } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectRepository } from "@/lib/repositories";
import type { Capability } from "@/types/domain";
import styles from "./Capabilities.module.css";

/** Outline icons on a 24px grid, drawn in the current text colour. */
const ICONS: Record<Capability["icon"], ReactNode> = {
  backend: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v6.2c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V5.5" />
      <path d="M4.5 11.7v6.5c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6.5" />
    </>
  ),
  frontend: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  ai: (
    <>
      <path d="M11 3.5l1.9 4.9 4.9 1.9-4.9 1.9L11 17.1l-1.9-4.9-4.9-1.9 4.9-1.9z" />
      <path d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
};

/**
 * Three things I do, each as a card a visitor can take in at a glance: a
 * one-line promise, three short points, the tools, and the projects that
 * prove it.
 */
export function Capabilities() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="capabilities-title">
      <SectionHeader id="capabilities-title" title="What I work on" />
      <div className={styles.grid}>
        {capabilities.map((capability) => (
          <article
            key={capability.title}
            className={`card ${styles.card} ${capability.highlight ? styles.highlight : ""}`}
          >
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                {ICONS[capability.icon]}
              </svg>
            </span>
            <div className={styles.heading}>
              <h3 className={styles.title}>{capability.title}</h3>
              <p className={styles.promise}>{capability.promise}</p>
            </div>
            <ul className={styles.points}>
              {capability.points.map((point) => (
                <li key={point}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12.5l4.2 4.2L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
            <ul className={`chips ${styles.tools}`} aria-label="Tools">
              {capability.tools.map((tool) => (
                <li key={tool} className="chip">
                  {tool}
                </li>
              ))}
            </ul>
            <div className={styles.proof}>
              <p className={styles.proofLabel}>Seen in</p>
              <ul className={styles.proofLinks}>
                {capability.proof.map((slug) => {
                  const project = projectRepository.getBySlug(slug);
                  return project ? (
                    <li key={slug}>
                      <Link href={`/work/${slug}`}>{project.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
