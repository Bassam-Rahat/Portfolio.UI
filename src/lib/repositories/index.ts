/**
 * Composition root for data access. This is the only module that knows the
 * content is static; swap the implementations here to change the data source.
 */
import { positions } from "@/content/experience";
import { projects } from "@/content/projects";
import { StaticExperienceRepository, type ExperienceRepository } from "./experience-repository";
import { StaticProjectRepository, type ProjectRepository } from "./project-repository";

export const projectRepository: ProjectRepository = new StaticProjectRepository(projects);
export const experienceRepository: ExperienceRepository = new StaticExperienceRepository(positions);

export type { ExperienceRepository, ProjectRepository };
