// ===== THEME MANAGEMENT =====
// Handles dark/light mode toggle with localStorage persistence

export type Theme = "light" | "dark";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("gsf-theme") as Theme) || "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("gsf-theme", theme);
}

export function toggleTheme(): Theme {
  const current = getStoredTheme();
  const next: Theme = current === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

export function initTheme() {
  // Called on mount to restore saved theme
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}
