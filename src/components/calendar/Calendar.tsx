import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CalendarMode = "single" | "range";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface CalendarProps {
  /** Selection mode */
  mode?: CalendarMode;
  /** Selected date (single mode) */
  selected?: Date | null | undefined;
  /** Selected range (range mode) */
  selectedRange?: DateRange | undefined;
  /** Called when a date is selected (single mode) */
  onSelect?: (date: Date) => void;
  /** Called when a range is selected (range mode) */
  onSelectRange?: (range: DateRange) => void;
  /** Disable all dates before today */
  disablePast?: boolean;
  /** Specific dates to disable */
  disabledDates?: Date[];
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBeforeDay = (a: Date, b: Date): boolean => {
  const _a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const _b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return _a < _b;
};

const isAfterDay = (a: Date, b: Date): boolean => {
  const _a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const _b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return _a > _b;
};

const isBetweenDays = (date: Date, from: Date, to: Date): boolean =>
  isAfterDay(date, from) && isBeforeDay(date, to);

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Calendar Core ───────────────────────────────────────────────────────────

export const Calendar = ({
  mode = "single",
  selected,
  selectedRange,
  onSelect,
  onSelectRange,
  disablePast = false,
  disabledDates = [],
  minDate,
  maxDate,
  className,
}: CalendarProps): React.JSX.Element => {
  const today = new Date();

  const [viewDate, setViewDate] = React.useState<Date>(
    () => startOfMonth(
      (mode === "single" ? (selected ?? null) : (selectedRange?.from ?? null)) ?? today
    )
  );

  // range hover tracking
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const prevMonth = (): void => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (): void => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isDisabled = (date: Date): boolean => {
    if (disablePast && isBeforeDay(date, today) && !isSameDay(date, today)) return true;
    if (minDate != null && isBeforeDay(date, minDate)) return true;
    if (maxDate != null && isAfterDay(date, maxDate)) return true;
    if (disabledDates.some((d) => isSameDay(d, date))) return true;
    return false;
  };

  const isSelected = (date: Date): boolean => {
    if (mode === "single") return selected != null && isSameDay(date, selected);
    if (mode === "range") {
      const { from, to } = selectedRange ?? { from: null, to: null };
      if (from != null && isSameDay(date, from)) return true;
      if (to != null && isSameDay(date, to)) return true;
    }
    return false;
  };

  const isRangeStart = (date: Date): boolean => {
    if (mode !== "range") return false;
    const from = selectedRange?.from;
    return from != null && isSameDay(date, from);
  };

  const isRangeEnd = (date: Date): boolean => {
    if (mode !== "range") return false;
    const to = selectedRange?.to;
    return to != null && isSameDay(date, to);
  };

  const isInRange = (date: Date): boolean => {
    if (mode !== "range") return false;
    const { from, to } = selectedRange ?? { from: null, to: null };
    // confirmed range
    if (from != null && to != null) return isBetweenDays(date, from, to);
    // hover preview
    if (from != null && to == null && hoverDate != null) {
      const rangeEnd = isAfterDay(hoverDate, from) ? hoverDate : from;
      const rangeStart = isAfterDay(hoverDate, from) ? from : hoverDate;
      return isBetweenDays(date, rangeStart, rangeEnd);
    }
    return false;
  };

  const handleDayClick = (date: Date): void => {
    if (isDisabled(date)) return;

    if (mode === "single") {
      onSelect?.(date);
      return;
    }

    // range mode
    const { from, to } = selectedRange ?? { from: null, to: null };
    if (from == null || (from != null && to != null)) {
      onSelectRange?.({ from: date, to: null });
    } else {
      if (isBeforeDay(date, from)) {
        onSelectRange?.({ from: date, to: from });
      } else {
        onSelectRange?.({ from, to: date });
      }
    }
  };

  // build grid cells: leading empty + day cells
  const cells: Array<{ day: number | null }> = [
    ...Array.from({ length: firstDayOfWeek }, () => ({ day: null })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1 })),
  ];

  // pad to full rows
  while (cells.length % 7 !== 0) cells.push({ day: null });

  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-4 w-72 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="text-sm font-semibold text-[var(--color-text)]">
          {MONTHS[month]} {year}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-[var(--color-text-muted)] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          if (cell.day == null) {
            return <div key={`empty-${idx}`} />;
          }

          const date = new Date(year, month, cell.day);
          const disabled = isDisabled(date);
          const selected_ = isSelected(date);
          const isToday = isSameDay(date, today);
          const inRange = isInRange(date);
          const rangeStart = isRangeStart(date);
          const rangeEnd = isRangeEnd(date);

          return (
            <div
              key={cell.day}
              className={cn(
                "relative flex items-center justify-center",
                // range background strip
                inRange && "bg-[var(--color-primary-subtle)]",
                rangeStart && "rounded-l-full bg-[var(--color-primary-subtle)]",
                rangeEnd && "rounded-r-full bg-[var(--color-primary-subtle)]",
              )}
            >
              <button
                type="button"
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={disabled}
                aria-label={date.toDateString()}
                aria-pressed={selected_}
                className={cn(
                  "w-8 h-8 rounded-full text-xs font-medium transition-all duration-150",
                  "flex items-center justify-center z-10 relative",
                  // default
                  !selected_ && !disabled && "text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]",
                  // today ring
                  isToday && !selected_ && "ring-1 ring-[var(--color-primary)] font-semibold text-[var(--color-primary)]",
                  // selected
                  selected_ && "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90",
                  // disabled
                  disabled && "text-[var(--color-text-muted)] opacity-40 cursor-not-allowed",
                )}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";