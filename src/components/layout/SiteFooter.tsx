import { profile } from "@/content/profile";
import { LocalTime } from "@/components/ui/LocalTime";
import { telHref } from "@/lib/format";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const elsewhere = [
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "GitHub", href: profile.links.github },
    { label: "Stack Overflow", href: profile.links.stackoverflow },
  ];

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={`card ${styles.panel}`}>
          <div className={styles.panelText}>
            <h2 className={styles.title}>Get in touch</h2>
            <p className={styles.note}>
              Hiring for a senior engineering role, or building something that has to work every day? I read every
              message.
            </p>
          </div>
          <div className={styles.panelActions}>
            <div className={styles.buttons}>
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Email me <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href={profile.links.linkedin} className="btn btn-ghost" target="_blank" rel="noopener me">
                LinkedIn
              </a>
            </div>
            <ul className={styles.direct}>
              <li>
                <span className={styles.directLabel}>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className={styles.directLabel}>Phone</span>
                <a href={telHref(profile.phone)}>{profile.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`grid ${styles.columns}`}>
          <div className={styles.column}>
            <h3 className={styles.heading}>Elsewhere</h3>
            <ul className={styles.list}>
              {elsewhere.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener me">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.heading}>Résumé</h3>
            <ul className={styles.list}>
              <li>
                <a href={profile.resumePath} target="_blank" rel="noopener">
                  Download PDF
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.heading}>Local time</h3>
            <p className={styles.time}>
              <LocalTime />
            </p>
          </div>
          <a href="#main" className={styles.toTop}>
            Back to top
            <span className="round-arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>

        <div className={styles.sign}>
          <p>© {profile.name}</p>
          <p>Updated {profile.updated}</p>
        </div>
      </div>
    </footer>
  );
}
