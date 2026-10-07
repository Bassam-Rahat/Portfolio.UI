"use client";

import { useSyncExternalStore } from "react";
import {
  readPreference,
  readServerPreference,
  savePreference,
  subscribeToPreference,
  type ThemePreference,
} from "./theme";
import styles from "./ThemeSwitch.module.css";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeSwitch() {
  // null while server-rendering; the real value once hydrated.
  const preference = useSyncExternalStore(subscribeToPreference, readPreference, readServerPreference);

  return (
    <fieldset className={styles.switch}>
      <legend className="visually-hidden">Colour theme</legend>
      {OPTIONS.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            type="radio"
            name="theme"
            value={option.value}
            checked={preference === option.value}
            onChange={() => savePreference(option.value)}
            className={styles.input}
          />
          <span className={styles.text}>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
