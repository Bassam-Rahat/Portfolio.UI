"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Figure } from "@/components/ui/Figure";
import { categoryLabels } from "@/lib/format";
import type { ProjectCategory } from "@/types/domain";
import styles from "./WorkCatalog.module.css";

export interface CatalogItem {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  where: string;
  role: string;
  categories: ProjectCategory[];
  stack: string[];
  lead?: { value: string; label: string };
}

interface WorkCatalogProps {
  items: CatalogItem[];
  /** Server-rendered covers keyed by slug. */
  covers: Record<string, ReactNode>;
  filters: { value: ProjectCategory; label: string }[];
}

type Filter = ProjectCategory | "all";

export function WorkCatalog({ items, covers, filters }: WorkCatalogProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.categories.includes(filter))),
    [filter, items],
  );

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All", count: items.length },
    ...filters.map((option) => ({
      ...option,
      count: items.filter((item) => item.categories.includes(option.value)).length,
    })),
  ];

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects by type">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.filter}
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
            <span className={`data ${styles.count}`}>{option.count}</span>
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} of {items.length} projects
      </p>

      <ol className={styles.list}>
        {visible.map((item) => (
          <li key={item.slug} className={`card card-hover grid ${styles.item}`} data-cover-hover>
            <div className={styles.cover}>{covers[item.slug]}</div>
            <div className={styles.body}>
              <div className={styles.top}>
                <span className={`data ${styles.period}`}>{item.period}</span>
                <ul className="chips" aria-label="Type">
                  {item.categories.map((category) => (
                    <li key={category} className="chip chip-accent">
                      {categoryLabels[category]}
                    </li>
                  ))}
                </ul>
                <span className={`round-arrow ${styles.open}`} aria-hidden="true">
                  →
                </span>
              </div>
              <h2 className={styles.title}>
                <Link href={`/work/${item.slug}`} className={styles.stretch}>
                  {item.title}
                </Link>
              </h2>
              <p className={styles.tagline}>{item.tagline}</p>
              <p className={styles.meta}>
                {item.where} <span aria-hidden="true">·</span> {item.role}
              </p>
              {item.lead ? (
                <p className={styles.lead}>
                  <Figure value={item.lead.value} className={styles.leadValue} /> {item.lead.label}
                </p>
              ) : null}
              <ul className={`chips ${styles.stack}`} aria-label="Stack">
                {item.stack.slice(0, 5).map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
