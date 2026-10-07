import type { Project, ProjectCategory } from "@/types/domain";

/**
 * Read-only access to projects. Pages depend on this interface, not on where
 * the data lives, so a CMS- or database-backed implementation can replace the
 * static one without changing any route.
 */
export interface ProjectRepository {
  getAll(): Project[];
  getFeatured(): Project[];
  getBySlug(slug: string): Project | undefined;
  getByCategory(category: ProjectCategory): Project[];
  /** The projects either side of `slug` in display order, wrapping around. */
  getNeighbours(slug: string): { previous: Project; next: Project } | undefined;
}

export class StaticProjectRepository implements ProjectRepository {
  private readonly ordered: Project[];

  constructor(projects: Project[]) {
    // Newest first; featured work leads within a year.
    this.ordered = [...projects].sort(
      (a, b) => b.sortYear - a.sortYear || Number(b.featured) - Number(a.featured),
    );
  }

  getAll(): Project[] {
    return this.ordered;
  }

  getFeatured(): Project[] {
    return this.ordered.filter((project) => project.featured);
  }

  getBySlug(slug: string): Project | undefined {
    return this.ordered.find((project) => project.slug === slug);
  }

  getByCategory(category: ProjectCategory): Project[] {
    return this.ordered.filter((project) => project.categories.includes(category));
  }

  getNeighbours(slug: string) {
    const index = this.ordered.findIndex((project) => project.slug === slug);
    if (index === -1) return undefined;
    const count = this.ordered.length;
    return {
      previous: this.ordered[(index - 1 + count) % count],
      next: this.ordered[(index + 1) % count],
    };
  }
}
