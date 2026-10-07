import { OG_SIZE, renderOgCard } from "@/lib/og";
import { projectRepository } from "@/lib/repositories";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projectRepository.getAll().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectRepository.getBySlug(slug);

  return renderOgCard({
    eyebrow: project ? `${project.organisation} · ${project.period}` : "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.tagline ?? "",
    metrics: project?.metrics,
  });
}
