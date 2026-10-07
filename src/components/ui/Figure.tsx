import styles from "./Figure.module.css";

/**
 * A display figure such as "~10,000" or "20.5s → 1.1s".
 * The approximation sign is set in the sans at a smaller size and raised,
 * because the serif's tilde sits on the baseline and reads as a dash.
 */
export function Figure({ value, className }: { value: string; className?: string }) {
  const approximate = value.startsWith("~");
  return (
    <span className={className}>
      {approximate ? (
        <span className={styles.approx}>
          <span aria-hidden="true">~</span>
          <span className="visually-hidden">about </span>
        </span>
      ) : null}
      {approximate ? value.slice(1) : value}
    </span>
  );
}
