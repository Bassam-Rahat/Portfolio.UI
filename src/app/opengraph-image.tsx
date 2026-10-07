import { profile } from "@/content/profile";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = `${profile.name}, ${profile.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderOgCard({
    eyebrow: `${profile.role} · Lahore`,
    title: profile.name,
    subtitle: profile.headline,
    metrics: profile.ledger,
  });
}
