import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import type { Metric } from "@/types/domain";

export const OG_SIZE = { width: 1200, height: 630 };

/** The site's dark palette: share cards stand out in light-themed feeds. */
const COLORS = {
  bg: "#0a0a0b",
  panel: "#111113",
  ink: "#f4f4f2",
  ink2: "#a9a9b1",
  muted: "#7d7d86",
  hairline: "#2d2d32",
  accent: "#ff6a3d",
};

interface OgCardInput {
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics?: Metric[];
}

/** Cached so the file reads happen once at build time and the images can be prerendered. */
async function readFontFiles() {
  "use cache";
  cacheLife("max");
  const dir = join(process.cwd(), "assets", "fonts");
  const [display, sans] = await Promise.all([
    readFile(join(dir, "HubotSans-ExtraBold.ttf")),
    readFile(join(dir, "MonaSans-Medium.ttf")),
  ]);
  const toArrayBuffer = (file: Buffer): ArrayBuffer => {
    const copy = new ArrayBuffer(file.byteLength);
    new Uint8Array(copy).set(file);
    return copy;
  };
  return { display: toArrayBuffer(display), sans: toArrayBuffer(sans) };
}

async function loadFonts() {
  const { display, sans } = await readFontFiles();
  return [
    { name: "Hubot Sans", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Mona Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ];
}

/** Shared Open Graph card in the site's dark palette. */
export async function renderOgCard({ eyebrow, title, subtitle, metrics = [] }: OgCardInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: `radial-gradient(900px 500px at 85% 0%, rgba(255,106,61,0.22), transparent 70%), ${COLORS.bg}`,
          color: COLORS.ink,
          fontFamily: "Mona Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                background: COLORS.accent,
                color: COLORS.bg,
                fontFamily: "Hubot Sans",
                fontSize: 20,
              }}
            >
              BR
            </div>
            <span style={{ color: COLORS.ink2 }}>{profile.name}</span>
          </div>
          <span style={{ color: COLORS.muted }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Hubot Sans", fontSize: 92, lineHeight: 0.98, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: COLORS.ink2, maxWidth: 940 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {metrics.slice(0, 3).map((metric) => (
            <div
              key={metric.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "18px 22px",
                border: `1px solid ${COLORS.hairline}`,
                borderRadius: 18,
                background: COLORS.panel,
                minWidth: 250,
              }}
            >
              <span style={{ fontFamily: "Hubot Sans", fontSize: 38, color: COLORS.accent }}>{metric.value}</span>
              <span style={{ fontSize: 19, color: COLORS.muted }}>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
