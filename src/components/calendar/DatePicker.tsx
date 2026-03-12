import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar, type CalendarProps, type DateRange } from "./Calendar";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ─── Single DatePicker ───────────────────────────────────────────────────────

export interface DatePickerProps extends Omit<CalendarProps, "mode" | "selectedRange" | "onSelectRange"> {
  selected?: Date | null | undefined;
  placeholder?: string;
  inputClassName?: string;
}

export const DatePicker = ({
  selected,
  onSelect,
  placeholder = "Pick a date",
  inputClassName,
  ...calendarProps
}: DatePickerProps): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (ref.current != null && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return (): void => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (date: Date): void => {
    onSelect?.(date);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block w-72">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "rounded-lg border border-zinc-200 bg-white px-3 py-2.5",
          "text-sm transition-all duration-150 outline-none",
          "hover:border-zinc-300",
          "focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10",
          open && "border-zinc-900 ring-2 ring-zinc-900/10",
          inputClassName
        )}
      >
        <span className={cn(selected != null ? "text-zinc-900" : "text-zinc-400")}>
          {selected != null ? formatDate(selected) : placeholder}
        </span>
        <CalendarIcon />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            {...calendarProps}
          />
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";

// ─── Range DatePicker ────────────────────────────────────────────────────────

export interface DateRangePickerProps extends Omit<CalendarProps, "mode" | "selected" | "onSelect"> {
  selectedRange?: DateRange | undefined;
  placeholder?: string;
  inputClassName?: string;
}

export const DateRangePicker = ({
  selectedRange,
  onSelectRange,
  placeholder = "Pick a date range",
  inputClassName,
  ...calendarProps
}: DateRangePickerProps): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (ref.current != null && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return (): void => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectRange = (range: DateRange): void => {
    onSelectRange?.(range);
    // close only when both dates are picked
    if (range.from != null && range.to != null) {
      setOpen(false);
    }
  };

  const label = React.useMemo((): string => {
    const from = selectedRange?.from;
    const to = selectedRange?.to;
    if (from != null && to != null) return `${formatDate(from)} – ${formatDate(to)}`;
    if (from != null) return `${formatDate(from)} – …`;
    return placeholder;
  }, [selectedRange, placeholder]);

  return (
    <div ref={ref} className="relative inline-block w-72">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "rounded-lg border border-zinc-200 bg-white px-3 py-2.5",
          "text-sm transition-all duration-150 outline-none",
          "hover:border-zinc-300",
          "focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10",
          open && "border-zinc-900 ring-2 ring-zinc-900/10",
          inputClassName
        )}
      >
        <span className={cn(selectedRange?.from != null ? "text-zinc-900" : "text-zinc-400")}>
          {label}
        </span>
        <CalendarIcon />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <Calendar
            mode="range"
            selectedRange={selectedRange}
            onSelectRange={handleSelectRange}
            {...calendarProps}
          />
        </div>
      )}
    </div>
  );
};

DateRangePicker.displayName = "DateRangePicker";

// ─── Icon ────────────────────────────────────────────────────────────────────

const CalendarIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-400 shrink-0">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
