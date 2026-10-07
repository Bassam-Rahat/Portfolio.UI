import { ViewTransition, type CSSProperties } from "react";
import { createCover } from "@/lib/cover";
import type { Project } from "@/types/domain";
import { CoverSceneView } from "./CoverScenes";
import styles from "./ProjectCover.module.css";

interface ProjectCoverProps {
  project: Project;
  /** "card" (3:2) for lists, "hero" (21:9) for the top of a case study. */
  variant?: "card" | "hero";
  /**
   * Gives the cover a shared identity so it morphs between pages.
   * Only one cover per slug may carry it on any page.
   */
  morph?: boolean;
  /** Overrides the screenshot `sizes` hint when the cover is drawn smaller than usual. */
  sizes?: string;
}

/** How wide a screenshot is drawn in each variant (card covers zoom it 1.5×). */
const SIZES = {
  card: "(max-width: 960px) 150vw, 1080px",
  hero: "(max-width: 720px) 150vw, 1200px",
} as const;

/**
 * Cover art for a project: a product-style window with the project's address
 * over its scene (see `CoverScene`): a real, cleaned screenshot where there is
 * one, otherwise real code, a real figure or placeholder shapes. Decorative;
 * the same facts are in the text beside it.
 */
export function ProjectCover({ project, variant = "card", morph = false, sizes }: ProjectCoverProps) {
  const design = createCover(project.slug);
  const address = project.link?.label ?? project.title;
  const glow = { "--gx": `${design.glow.x}%`, "--gy": `${design.glow.y}%` } as CSSProperties;
  // A real screen fills its window edge to edge, and on a case study it gets
  // the full width instead of sharing it with the stack card.
  const isScreen = project.cover.kind === "screenshot";

  const art = (
    <div
      className={`${styles.frame} ${styles[variant]} ${isScreen ? styles.screen : ""}`}
      style={glow}
      aria-hidden="true"
    >
      <div className={styles.window}>
        <div className={styles.bar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.address}>{address}</span>
        </div>
        <div className={isScreen ? styles.flush : styles.content}>
          <CoverSceneView
            project={project}
            design={design}
            sizes={sizes ?? SIZES[variant]}
            eager={variant === "hero"}
          />
        </div>
      </div>

      {variant === "hero" && !isScreen ? (
        <div className={styles.side}>
          <p className={styles.sideLabel}>Built with</p>
          <ul className={styles.stack}>
            {project.stack.slice(0, 6).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );

  if (!morph) return art;

  return (
    <ViewTransition name={`cover-${project.slug}`} share="cover-morph" default="none">
      {art}
    </ViewTransition>
  );
}
