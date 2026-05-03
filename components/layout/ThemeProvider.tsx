"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initTheme, toggleTheme, getStoredTheme, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
  isDark: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Initialize theme from localStorage on mount
    const stored = initTheme();
    setTheme(stored);
  }, []);

  function handleToggle() {
    const next = toggleTheme();
    setTheme(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle: handleToggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}
