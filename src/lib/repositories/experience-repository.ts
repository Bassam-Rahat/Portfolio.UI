import type { Position } from "@/types/domain";

export interface ExperienceRepository {
  getPositions(): Position[];
  getPositionForProject(slug: string): Position | undefined;
}

export class StaticExperienceRepository implements ExperienceRepository {
  private readonly ordered: Position[];

  constructor(positions: Position[]) {
    this.ordered = [...positions].sort((a, b) => b.start.localeCompare(a.start));
  }

  getPositions(): Position[] {
    return this.ordered;
  }

  getPositionForProject(slug: string): Position | undefined {
    return this.ordered.find((position) => position.projectSlugs.includes(slug));
  }
}
