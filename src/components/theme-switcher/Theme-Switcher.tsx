import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme, BLUE_THEMES, type BlueTheme, type ColorMode } from "@/lib/theme";

// ─── Icons ───────────────────────────────────────────────────────────────────

const PaletteIcon = (): React.JSX.Element => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="6" r="1" fill="currentColor" />
    <circle cx="8" cy="5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="6" r="1" fill="currentColor" />
    <path d="M5 10c.8 1.2 5.2 1.2 6 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SunIcon = (): React.JSX.Element => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = (): React.JSX.Element => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 10A6 6 0 016 2.5a6 6 0 100 11 6 6 0 007.5-3.5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = ({ color }: { color: string }): React.JSX.Element => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ThemeSwitcherProps {
  variant?: "popover" | "inline" | "icon" | undefined;
  align?: "left" | "right" | undefined;
  className?: string | undefined;
}

// ─── ThemeSwitcher ────────────────────────────────────────────────────────────

export const ThemeSwitcher = ({
  variant = "popover",
  align = "right",
  className,
}: ThemeSwitcherProps): React.JSX.Element => {
  const { colorMode, blueTheme, setColorMode, setBlueTheme } = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const activeTheme = BLUE_THEMES.find((t) => t.value === blueTheme) ?? BLUE_THEMES[0];

  React.useEffect((): (() => void) => {
    const handler = (e: MouseEvent): void => {
      if (ref.current != null && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return (): void => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect((): (() => void) => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return (): void => document.removeEventListener("keydown", handler);
  }, []);

  if (variant === "inline") {
    return (
      <div className={className}>
        <ThemePanel
          colorMode={colorMode}
          blueTheme={blueTheme}
          setColorMode={setColorMode}
          setBlueTheme={setBlueTheme}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>

      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open theme switcher"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 h-9 rounded-[var(--radius-lg)]",
          "border border-[var(--color-border)] bg-[var(--color-surface)]",
          "text-[var(--color-text-subtle)] text-sm",
          "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
          open && "bg-[var(--color-bg-subtle)] text-[var(--color-text)]",
          variant === "icon" ? "w-9 justify-center px-0" : "px-3"
        )}
      >
        {/* Active color dot */}
        {variant !== "icon" && (
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: activeTheme?.color }}
          />
        )}

        <PaletteIcon />

        {/* Label + mode badge — hidden in icon variant */}
        {variant !== "icon" && (
          <>
            <span>Theme</span>
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium leading-none"
              style={{
                backgroundColor: `${activeTheme?.color}20`,
                color: activeTheme?.color,
              }}
            >
              {colorMode}
            </span>
          </>
        )}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          className={cn(
            "absolute top-full mt-2 z-50 w-56",
            "bg-[var(--color-surface)] border border-[var(--color-border)]",
            "rounded-[var(--radius-xl)] p-3",
            "shadow-[var(--shadow-lg)]",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <ThemePanel
            colorMode={colorMode}
            blueTheme={blueTheme}
            setColorMode={setColorMode}
            setBlueTheme={setBlueTheme}
          />
        </div>
      )}
    </div>
  );
};

ThemeSwitcher.displayName = "ThemeSwitcher";

// ─── ThemePanel ───────────────────────────────────────────────────────────────

interface ThemePanelProps {
  colorMode: ColorMode;
  blueTheme: BlueTheme;
  setColorMode: (mode: ColorMode) => void;
  setBlueTheme: (theme: BlueTheme) => void;
}

const ThemePanel = ({
  colorMode,
  blueTheme,
  setColorMode,
  setBlueTheme,
}: ThemePanelProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-3">

      {/* ── Color theme ── */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-widest px-1">
          Color theme
        </p>
        <div className="flex flex-col gap-1">
          {BLUE_THEMES.map((t) => {
            const isActive = blueTheme === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setBlueTheme(t.value)}
                style={isActive ? { borderColor: t.color } : undefined}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-lg)]",
                  "text-sm transition-all duration-150 text-left w-full",
                  "border",
                  isActive
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text)]"
                    : "border-transparent text-[var(--color-text-subtle)]",
                  !isActive && "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]"
                )}
              >
                {/* Palette swatch */}
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: t.color }}
                />

                <span className="flex-1 font-medium">{t.label}</span>

                {/* Colored checkmark */}
                {isActive && (
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${t.color}25` }}
                  >
                    <CheckIcon color={t.color} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[var(--color-border)]" />

      {/* ── Mode toggle ── */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-widest px-1">
          Mode
        </p>
        <div className="flex gap-1 p-1 rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)]">
          {(["dark", "light"] as ColorMode[]).map((mode) => {
            const isActive = colorMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setColorMode(mode)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-[var(--radius-md)]",
                  "text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-sm)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-subtle)]"
                )}
              >
                {mode === "dark" ? <MoonIcon /> : <SunIcon />}
                <span className="capitalize">{mode}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};