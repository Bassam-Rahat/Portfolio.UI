import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  id: string;
  title: string;
  /** Right-margin note: a count, a date range or a link. */
  aside?: ReactNode;
}

export function SectionHeader({ id, title, aside }: SectionHeaderProps) {
  return (
    <div className={`grid ${styles.header}`}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </div>
  );
}
