"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

/**
 * Monogram plus name. On the home page the hero already shows the name at
 * full size, so the header keeps only the monogram to avoid saying it twice.
 */
export function Brand({ name, role, initials }: { name: string; role: string; initials: string }) {
  const onHome = usePathname() === "/";

  return (
    <Link href="/" className={styles.brand} aria-label={`${name}, home`}>
      <span className={styles.mark} aria-hidden="true">
        {initials}
      </span>
      {onHome ? null : (
        <span className={styles.brandText} aria-hidden="true">
          <span className={styles.wordmark}>{name}</span>
          <span className={styles.brandRole}>{role}</span>
        </span>
      )}
    </Link>
  );
}
