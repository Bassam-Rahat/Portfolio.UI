export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
const CHANGE_EVENT = "themepreferencechange";

/**
 * Runs before first paint (inlined in <head>) so the page never flashes the
 * wrong theme. A saved light/dark choice wins; otherwise the system setting.
 */
export const themeInitScript = `(() => {
  try {
    const saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    const dark = saved === "dark" || (saved !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
})();`;

/* --------------------------------------------------------------------------
   A tiny external store over localStorage, read with useSyncExternalStore.
   -------------------------------------------------------------------------- */

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

export function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

/** The server cannot know the visitor's preference. */
export const readServerPreference = (): ThemePreference | null => null;

export function applyPreference(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && darkQuery().matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function savePreference(preference: ThemePreference) {
  applyPreference(preference);
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage can be unavailable (private browsing); the choice still applies to this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Notifies on: this tab's choice, another tab's choice, and OS theme changes. */
export function subscribeToPreference(onChange: () => void) {
  const onSystemChange = () => {
    if (readPreference() === "system") applyPreference("system");
    onChange();
  };
  const query = darkQuery();
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  query.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    query.removeEventListener("change", onSystemChange);
  };
}
