import * as React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme | undefined;
}

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
}: ThemeProviderProps): React.JSX.Element => {
  const [theme, setThemeState] = React.useState<Theme>((): Theme => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem("frame-ui-theme");
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return defaultTheme;
  });

  React.useEffect((): void => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("frame-ui-theme", theme);
  }, [theme]);

  const setTheme = (next: Theme): void => setThemeState(next);
  const toggleTheme = (): void => setThemeState((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export const useTheme = (): ThemeContextValue => {
  const ctx = React.useContext(ThemeContext);
  if (ctx == null) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
};

// ─── Toggle button ───────────────────────────────────────────────────────────

export const ThemeToggle = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100 transition-colors duration-150"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 10A6 6 0 016 2.5a6 6 0 100 11 6 6 0 007.5-3.5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);