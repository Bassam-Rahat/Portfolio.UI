import type { CSSProperties } from "react";
import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/content/profile";
import { experienceRepository } from "@/lib/repositories";
import styles from "./Opener.module.css";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Illustrative inbox rows for the SupportDesk card (sample UI, not real tickets). */
const SAMPLE_TICKETS = [
  { subject: "Invoice copy for September", from: "Accounts", sentiment: "Neutral" },
  { subject: "Still can't sign in after reset", from: "Support", sentiment: "Negative" },
  { subject: "Thanks, that fixed it!", from: "Customer", sentiment: "Positive" },
] as const;

/**
 * Home hero. Reading order: who (name), what (status), why (statement), then
 * what to do next. On the right, a decorative stack of product cards built from
 * real project facts (SupportDesk, ~10,000 tickets a month, 20.5s → 1.1s).
 * The name is the page's only h1; the card stack is hidden from screen readers.
 */
export function Opener() {
  const current = experienceRepository.getPositions()[0];
  const at = profile.headline.lastIndexOf(profile.headlineEmphasis);

  return (
    <section className={styles.hero} aria-labelledby="intro-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <div className={`${styles.status} arrive`} style={stagger(0)}>
            {current ? (
              <span className="pill">
                <span className={styles.live} aria-hidden="true" />
                {profile.role} at {current.company}
              </span>
            ) : null}
            <span className="pill">
              <LocalTime />
            </span>
          </div>
          <h1 id="intro-title" className={`${styles.name} arrive`} style={stagger(1)}>
            <span className={styles.nameText}>{profile.name}</span>
          </h1>
          <p className={`${styles.statement} arrive`} style={stagger(2)}>
            {profile.headline.slice(0, at)}
            <span className={styles.emphasis}>{profile.headlineEmphasis}</span>
          </p>
          <p className={`${styles.intro} arrive`} style={stagger(3)}>
            {profile.intro}
          </p>
          <div className={`${styles.actions} arrive`} style={stagger(4)}>
            <Link href="/work" className="btn btn-primary">
              See my work <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <a href={profile.resumePath} className="btn btn-ghost" target="_blank" rel="noopener">
              Download résumé
            </a>
          </div>
        </div>

        <div className={`${styles.stage} arrive`} style={stagger(2)} aria-hidden="true">
          <div className={styles.glow} />

          {/* The cards sit in a gently tilted 3D scene that straightens on hover. */}
          <div className={styles.scene}>
            {/* Main card: a SupportDesk inbox with Claude sentiment tags. */}
            <div className={`${styles.panel} ${styles.inbox}`}>
              <div className={styles.panelBar}>
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.panelTitle}>SupportDesk · Inbox</span>
              </div>
              <ul className={styles.tickets}>
                {SAMPLE_TICKETS.map((ticket, index) => (
                  <li key={ticket.subject}>
                    <span className={styles.avatar}>{ticket.from[0]}</span>
                    <span className={styles.ticketText}>
                      <span className={styles.ticketSubject}>{ticket.subject}</span>
                      <span className={styles.ticketFrom}>{ticket.from}</span>
                    </span>
                    <span
                      className={`${styles.tag} ${styles[`tag${ticket.sentiment}`]}`}
                      style={{ "--t": index } as CSSProperties}
                    >
                      {ticket.sentiment}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={styles.panelFoot}>
                <span className={styles.spark}>✦</span>
                <span className={styles.shimmer}>Sentiment by Claude Haiku 4.5</span>
              </p>
            </div>

            {/* Metric card. */}
            <div className={`${styles.panel} ${styles.metric}`}>
              <p className={styles.metricLabel}>Tickets a month</p>
              <p className={styles.metricValue}>~10,000</p>
              <div className={styles.bars}>
                {[38, 52, 46, 61, 58, 72, 69, 84, 80, 92].map((h, i) => (
                  <span key={i} style={{ height: `${h}%`, "--b": i } as CSSProperties} />
                ))}
              </div>
            </div>

            {/* Before/after card: the "after" bar shrinks into place on load. */}
            <div className={`${styles.panel} ${styles.speed}`}>
              <p className={styles.metricLabel}>Webhook response</p>
              <div className={styles.compare}>
                <span>Before</span>
                <span className={styles.trackSlow} />
                <b>20.5s</b>
                <span>After</span>
                <span className={styles.trackFast} />
                <b className={styles.accentText}>1.1s</b>
              </div>
            </div>

            <span className={`${styles.chip} ${styles.chipA}`}>.NET 10</span>
            <span className={`${styles.chip} ${styles.chipB}`}>Next.js 16</span>
            <span className={`${styles.chip} ${styles.chipC}`}>Claude API</span>
          </div>
        </div>
      </div>
    </section>
  );
}
