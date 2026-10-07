import Image from "next/image";
import type { CSSProperties } from "react";
import { areaChart, type CoverDesign } from "@/lib/cover";
import type { CoverScene, Project, ScreenImage } from "@/types/domain";
import styles from "./CoverScenes.module.css";

interface CoverSceneViewProps {
  project: Project;
  design: CoverDesign;
  /** `sizes` for a screenshot, matching how wide the cover is drawn. */
  sizes: string;
  /** Load a screenshot straight away (the cover is above the fold). */
  eager?: boolean;
}

/**
 * The inside of a cover's app window: a real screen or real code where the
 * project has them, otherwise placeholder shapes that suggest the product.
 */
export function CoverSceneView({ project, design, sizes, eager = false }: CoverSceneViewProps) {
  const scene: CoverScene = project.cover;
  switch (scene.kind) {
    case "screenshot":
      return <ScreenshotScene image={scene.image} sizes={sizes} eager={eager} />;
    case "chart":
      return <ChartScene metric={project.metrics[scene.metric] ?? project.metrics[0]} design={design} />;
    case "chat":
      return <ChatScene />;
    case "code":
      return scene.source ? <SourceScene source={scene.source} /> : <CodeScene />;
    case "shop":
      return <ShopScene />;
    case "table":
      return <TableScene icon="avatar" />;
    case "files":
      return <TableScene icon="file" />;
    case "phones":
      return <PhonesScene />;
    case "page":
      return <PageScene />;
  }
}

type Tone = "plain" | "faint" | "accent";

/** A rounded bar standing in for a line of text. Width in percent or `u`. */
function Line({ width, tone = "plain", thick = false }: { width: string; tone?: Tone; thick?: boolean }) {
  return <i className={`${styles.line} ${styles[tone]} ${thick ? styles.thick : ""}`} style={{ width }} />;
}

const u = (n: number) => `calc(var(--u) * ${n})`;

/**
 * How far a card cover zooms into a screenshot. Captures from a full-width
 * browser (~1900px) get 1.5×; captures from a narrower window already show
 * the interface large, so they are shown at their full width.
 */
const shotZoom = (width: number) => Math.min(1.5, Math.max(1, width / 1280));

function ScreenshotScene({ image, sizes, eager }: { image: ScreenImage; sizes: string; eager: boolean }) {
  return (
    <Image
      src={image}
      alt=""
      sizes={sizes}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={styles.screenshot}
      style={{ "--shot-zoom": shotZoom(image.width).toFixed(2) } as CSSProperties}
    />
  );
}

/** Splits `key: "value",` into its parts so each can take its own colour. */
const SOURCE_LINE = /^(\s*)([\w$]+)(\s*:\s*)("[^"]*"|[\w.]+)(,?)$/;

/** Real code or output, lightly coloured: keys in ink, values in the accent. */
function SourceScene({ source }: { source: string }) {
  return (
    <div className={`${styles.code} ${styles.source}`}>
      {source.split("\n").map((text, i) => {
        const match = SOURCE_LINE.exec(text);
        return (
          <div key={i} className={styles.codeLine}>
            <span className={styles.lineNo}>{i + 1}</span>
            {match ? (
              <span className={styles.sourceText}>
                {match[1]}
                <span className={styles.key}>{match[2]}</span>
                <span className={styles.punct}>{match[3]}</span>
                <span className={styles.string}>{match[4]}</span>
                <span className={styles.punct}>{match[5]}</span>
              </span>
            ) : (
              <span className={`${styles.sourceText} ${styles.punct}`}>{text}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChartScene({ metric, design }: { metric?: Project["metrics"][number]; design: CoverDesign }) {
  const { line, fill } = areaChart(design.series);
  return (
    <div className={styles.chart}>
      {metric ? (
        <>
          <p className={styles.label}>{metric.label}</p>
          <p className={styles.value}>{metric.value}</p>
        </>
      ) : null}
      {design.chart === "bars" ? (
        <div className={styles.bars}>
          {design.series.map((value, i) => (
            <span key={i} style={{ height: `${value}%` }} />
          ))}
        </div>
      ) : (
        <div className={styles.area}>
          <span className={styles.areaFill} style={{ clipPath: fill }} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <path d={line} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      )}
    </div>
  );
}

function ChatScene() {
  return (
    <div className={styles.chat}>
      <div className={styles.ask}>
        <Line width="78%" />
        <Line width="48%" />
      </div>
      <div className={styles.answerRow}>
        <span className={styles.mark}>✦</span>
        <div className={styles.answer}>
          <Line width="94%" tone="accent" />
          <Line width="82%" tone="accent" />
          <Line width="56%" tone="accent" />
        </div>
      </div>
      <div className={styles.composer}>
        <Line width="38%" tone="faint" />
        <span className={styles.send}>↑</span>
      </div>
    </div>
  );
}

/** Indent level, then segments as [width in u, tone]. */
const CODE: [number, [number, Tone][]][] = [
  [0, [[9, "accent"], [14, "plain"], [7, "faint"]]],
  [0, []],
  [0, [[7, "accent"], [18, "plain"]]],
  [1, [[11, "faint"], [22, "plain"]]],
  [1, [[8, "accent"], [13, "plain"], [9, "faint"]]],
  [2, [[16, "plain"], [11, "accent"]]],
  [2, [[12, "faint"], [8, "plain"]]],
  [1, [[5, "faint"]]],
  [0, [[3, "faint"]]],
];

function CodeScene() {
  return (
    <div className={styles.code}>
      {CODE.map(([indent, parts], i) => (
        <div key={i} className={styles.codeLine}>
          <span className={styles.lineNo}>{i + 1}</span>
          <span style={{ width: u(indent * 3.4), flex: "none" }} />
          {parts.map(([width, tone], j) => (
            <Line key={j} width={u(width)} tone={tone} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ShopScene() {
  return (
    <div className={styles.shop}>
      <div className={styles.shopBar}>
        <span className={styles.search}>
          <Line width="34%" tone="faint" />
        </span>
        <span className={styles.cart} />
      </div>
      <div className={styles.tiles}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.tile}>
            <span className={styles.thumb} />
            <Line width="82%" />
            <Line width="40%" tone="accent" />
          </div>
        ))}
      </div>
    </div>
  );
}

const ROWS: { name: string; detail: string; status: "done" | "open" | "idle" }[] = [
  { name: "46%", detail: "30%", status: "done" },
  { name: "38%", detail: "52%", status: "open" },
  { name: "54%", detail: "26%", status: "done" },
  { name: "32%", detail: "44%", status: "idle" },
];

function TableScene({ icon }: { icon: "avatar" | "file" }) {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <Line width={u(12)} tone="faint" />
        <Line width={u(8)} tone="faint" />
      </div>
      {ROWS.map((row, i) => (
        <div key={i} className={styles.row}>
          <span className={icon === "file" ? styles.file : styles.avatar} />
          <span className={styles.cell}>
            <Line width={row.name} />
            <Line width={row.detail} tone="faint" />
          </span>
          <span className={`${styles.status} ${styles[row.status]}`} />
        </div>
      ))}
    </div>
  );
}

function PhonesScene() {
  return (
    <div className={styles.phones}>
      {[0, 1].map((i) => (
        <div key={i} className={styles.phone} style={{ "--lift": i } as CSSProperties}>
          <span className={styles.notch} />
          <Line width="62%" thick />
          {[70, 52, 64, 44].map((width) => (
            <span key={width} className={styles.phoneRow}>
              <span className={styles.phoneDot} />
              <Line width={`${width}%`} tone={width === 52 ? "accent" : "plain"} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function PageScene() {
  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <span className={styles.logo} />
        <Line width={u(7)} tone="faint" />
        <Line width={u(7)} tone="faint" />
        <Line width={u(7)} tone="faint" />
        <span className={styles.navButton} />
      </div>
      <div className={styles.heroBlock}>
        <div className={styles.heroText}>
          <Line width="92%" thick />
          <Line width="64%" thick />
          <Line width="86%" tone="faint" />
          <Line width="70%" tone="faint" />
          <span className={styles.pageCta} />
        </div>
        <span className={styles.heroArt} />
      </div>
    </div>
  );
}
