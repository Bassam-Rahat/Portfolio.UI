"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Current time in Lahore. Rendered only after mount, so the prerendered HTML
 * never contains a stale time and hydration never mismatches.
 */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={className} aria-live="off">
      Lahore{time ? ` · ${time} PKT` : ""}
    </span>
  );
}
