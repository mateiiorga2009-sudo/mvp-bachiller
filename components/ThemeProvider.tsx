"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(getInitialTheme());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setThemeState((current) => (current === "dark" ? "light" : "dark")),
      setTheme: (next: Theme) => setThemeState(next)
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
