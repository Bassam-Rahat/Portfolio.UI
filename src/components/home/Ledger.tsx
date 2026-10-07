import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { profile } from "@/content/profile";
import { projectRepository } from "@/lib/repositories";
import styles from "./Ledger.module.css";

/** The headline figures, each linked to the case study that backs it up. */
export function Ledger() {
  return (
    <section className="container" aria-labelledby="ledger-title">
      <h2 id="ledger-title" className="visually-hidden">
        In numbers
      </h2>
      <ul className={styles.ledger}>
        {profile.ledger.map((entry) => {
          const proof = projectRepository.getBySlug(entry.proof);
          return (
            <li key={entry.label} className={`card card-hover ${styles.entry}`}>
              <p className={`${styles.value} ${entry.value.length > 8 ? styles.valueLong : ""}`}>
                <Figure value={entry.value} />
              </p>
              <p className={styles.label}>{entry.label}</p>
              {proof ? (
                <Link href={`/work/${proof.slug}`} className={`data ${styles.proof}`}>
                  {proof.title}
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
