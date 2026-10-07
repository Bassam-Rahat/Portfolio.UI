"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/domain";
import styles from "./SiteHeader.module.css";

export function NavLinks({ items, resumePath }: { items: NavItem[]; resumePath: string }) {
  const pathname = usePathname();
  const isCurrent = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <ul className={styles.links}>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={styles.link} aria-current={isCurrent(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <a href={resumePath} className={styles.link} target="_blank" rel="noopener">
          Résumé
        </a>
      </li>
    </ul>
  );
}
