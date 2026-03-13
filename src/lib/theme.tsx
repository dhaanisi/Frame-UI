import * as React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ColorMode = "light" | "dark";
export type BlueTheme = "electric" | "navy" | "ocean" | "pastel";

export interface ThemeContextValue {
  colorMode: ColorMode;
  blueTheme: BlueTheme;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  setBlueTheme: (theme: BlueTheme) => void;
}

export const BLUE_THEMES: { value: BlueTheme; label: string; color: string }[] = [
  { value: "electric", label: "Electric", color: "#3b82f6" },
  { value: "navy",     label: "Navy",     color: "#6366f1" },
  { value: "ocean",    label: "Ocean",    color: "#06b6d4" },
  { value: "pastel",   label: "Pastel",   color: "#0ea5e9" },
];

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children?: React.ReactNode | undefined;
  defaultColorMode?: ColorMode | undefined;
  defaultBlueTheme?: BlueTheme | undefined;
}

export const ThemeProvider = ({
  children,
  defaultColorMode = "dark",
  defaultBlueTheme = "electric",
}: ThemeProviderProps): React.JSX.Element => {
  const [colorMode, setColorModeState] = React.useState<ColorMode>((): ColorMode => {
    if (typeof window === "undefined") return defaultColorMode;
    const stored = localStorage.getItem("frame-ui-color-mode");
    if (stored === "light" || stored === "dark") return stored;
    return defaultColorMode;
  });

  const [blueTheme, setBlueThemeState] = React.useState<BlueTheme>((): BlueTheme => {
    if (typeof window === "undefined") return defaultBlueTheme;
    const stored = localStorage.getItem("frame-ui-blue-theme");
    if (stored === "electric" || stored === "navy" || stored === "ocean" || stored === "pastel") {
      return stored;
    }
    return defaultBlueTheme;
  });

  // Apply color mode
  React.useEffect((): void => {
    const root = document.documentElement;
    if (colorMode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("frame-ui-color-mode", colorMode);
  }, [colorMode]);

  // Apply blue theme
  React.useEffect((): void => {
    document.documentElement.setAttribute("data-theme", blueTheme);
    localStorage.setItem("frame-ui-blue-theme", blueTheme);
  }, [blueTheme]);

  const setColorMode = (mode: ColorMode): void => setColorModeState(mode);
  const toggleColorMode = (): void =>
    setColorModeState((m) => (m === "dark" ? "light" : "dark"));
  const setBlueTheme = (theme: BlueTheme): void => setBlueThemeState(theme);

  return (
    <ThemeContext.Provider value={{ colorMode, blueTheme, toggleColorMode, setColorMode, setBlueTheme }}>
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

// ─── ThemeToggle ─────────────────────────────────────────────────────────────

export const ThemeToggle = (): React.JSX.Element => {
  const { colorMode, toggleColorMode, blueTheme, setBlueTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Blue theme swatches */}
      <div className="flex items-center gap-1.5">
        {BLUE_THEMES.map((t) => (
          <button
            key={t.value}
            type="button"
            title={t.label}
            aria-label={`Switch to ${t.label} theme`}
            onClick={() => setBlueTheme(t.value)}
            style={{ backgroundColor: t.color }}
            className={`w-5 h-5 rounded-full transition-all duration-200
              ${blueTheme === t.value
                ? "ring-2 ring-offset-2 ring-offset-[var(--color-bg)] ring-white scale-110"
                : "opacity-50 hover:opacity-80"
              }`}
          />
        ))}
      </div>

      {/* Light / dark toggle */}
      <button
        type="button"
        onClick={toggleColorMode}
        aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg
          bg-[var(--color-surface)] border border-[var(--color-border)]
          text-[var(--color-text-subtle)] hover:text-[var(--color-text)]
          hover:bg-[var(--color-bg-subtle)] transition-colors duration-200"
      >
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = (): React.JSX.Element => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = (): React.JSX.Element => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 10A6 6 0 016 2.5a6 6 0 100 11 6 6 0 007.5-3.5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);