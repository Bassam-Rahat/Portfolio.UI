import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`container grid ${styles.wrap}`}>
      <p className={`data muted ${styles.code}`}>404</p>
      <h1 className={styles.title}>Nothing lives at this address.</h1>
      <p className={styles.text}>
        The page may have moved, or the link was mistyped. The <Link href="/work">full list of work</Link> or the{" "}
        <Link href="/">home page</Link> will get you back on track.
      </p>
    </div>
  );
}
