import type { ProjectCategory } from "@/types/domain";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-09" → "Sep 2025". Pure, so it is safe in prerendered output. */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI",
  saas: "SaaS",
  portal: "Portals",
  commerce: "Commerce",
  mobile: "Mobile",
  web: "Web",
};

/** Two-digit index used for numbered lists: 1 → "01". */
export function indexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** "+92 323 4839988" → "tel:+923234839988". */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Length of a finished role, counting both end months as LinkedIn does:
 * "2025-03" to "2025-08" → "6 mos". Pure, so it never reads the clock.
 */
export function formatDuration(start: string, end: string): string {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}
