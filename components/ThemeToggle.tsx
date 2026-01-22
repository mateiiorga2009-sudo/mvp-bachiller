"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white/80"
      aria-label="Cambiar tema"
      type="button"
    >
      <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
      {theme === "dark" ? "Oscuro" : "Claro"}
    </button>
  );
}
