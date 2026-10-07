/**
 * Deterministic parameters for a project's cover: where the light sits, which
 * chart the mock window shows and the chart's values. The same slug always
 * produces the same cover, so it is safe to render on the server.
 */

export interface CoverDesign {
  /** Centre of the background light, in percent of the frame. */
  glow: { x: number; y: number };
  chart: "bars" | "area";
  /** Rising series of chart values, each 0–100. */
  series: number[];
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** mulberry32: small, fast, good enough for artwork. */
function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const POINTS = 12;

export function createCover(slug: string): CoverDesign {
  const rand = random(hashString(slug));
  const glow = { x: Math.round(15 + rand() * 70), y: Math.round(rand() * 30) };
  const chart = rand() < 0.5 ? "bars" : "area";

  // A general upward trend with some noise, like a product that is growing.
  const curve = 0.8 + rand() * 0.6;
  const series = Array.from({ length: POINTS }, (_, i) => {
    const trend = 22 + 70 * Math.pow(i / (POINTS - 1), curve);
    const noise = (rand() - 0.5) * 18;
    return Math.round(Math.min(100, Math.max(10, trend + noise)));
  });

  return { glow, chart, series };
}

/**
 * An area chart in a 100 × 100 box: an SVG path for the line, and a CSS
 * `clip-path` polygon for the fill beneath it (so the fill can be a gradient).
 */
export function areaChart(series: number[]): { line: string; fill: string } {
  const step = 100 / (series.length - 1);
  const points = series.map((value, i) => [(i * step).toFixed(1), (100 - value * 0.9).toFixed(1)] as const);
  const line = `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;
  const fill = `polygon(0% 100%, ${points.map(([x, y]) => `${x}% ${y}%`).join(", ")}, 100% 100%)`;
  return { line, fill };
}
