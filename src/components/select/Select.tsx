import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean | undefined;
}

export interface SelectGroup {
  group: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

const isGroup = (item: SelectItem): item is SelectGroup =>
  "group" in item && "options" in item;

export interface SelectProps {
  /** Flat options or grouped options */
  items: SelectItem[];
  /** Selected value (single mode) */
  value?: string | undefined;
  /** Selected values (multi mode) */
  values?: string[] | undefined;
  /** Enable multi-select */
  multi?: boolean | undefined;
  /** Placeholder text */
  placeholder?: string | undefined;
  /** Label shown above */
  label?: string | undefined;
  /** Helper text shown below */
  helperText?: string | undefined;
  /** Disables the entire select */
  disabled?: boolean | undefined;
  /** Called on single selection change */
  onChange?: ((value: string) => void) | undefined;
  /** Called on multi selection change */
  onChangeMulti?: ((values: string[]) => void) | undefined;
  className?: string | undefined;
  wrapperClassName?: string | undefined;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getAllOptions = (items: SelectItem[]): SelectOption[] =>
  items.flatMap((item) => (isGroup(item) ? item.options : [item]));

const getLabel = (items: SelectItem[], value: string): string =>
  getAllOptions(items).find((o) => o.value === value)?.label ?? value;

// ─── Chevron icon ─────────────────────────────────────────────────────────────

const ChevronDown = ({ open }: { open: boolean }): React.JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={cn("text-zinc-400 shrink-0 transition-transform duration-200", open && "rotate-180")}
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = (): React.JSX.Element => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const Select = ({
  items,
  value,
  values = [],
  multi = false,
  placeholder = "Select an option",
  label,
  helperText,
  disabled = false,
  onChange,
  onChangeMulti,
  className,
  wrapperClassName,
}: SelectProps): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  // close on outside click
  React.useEffect((): (() => void) => {
    const handler = (e: MouseEvent): void => {
      if (ref.current != null && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return (): void => document.removeEventListener("mousedown", handler);
  }, []);

  // close on Escape
  React.useEffect((): (() => void) => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return (): void => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled === true) return;

    if (multi) {
      const next = values.includes(option.value)
        ? values.filter((v) => v !== option.value)
        : [...values, option.value];
      onChangeMulti?.(next);
    } else {
      onChange?.(option.value);
      setOpen(false);
    }
  };

  const isSelected = (optionValue: string): boolean =>
    multi ? values.includes(optionValue) : value === optionValue;

  // trigger label
  const triggerLabel = React.useMemo((): string => {
    if (multi) {
      if (values.length === 0) return placeholder;
      if (values.length === 1) return getLabel(items, values[0] ?? "");
      return `${values.length} selected`;
    }
    return value != null && value.length > 0 ? getLabel(items, value) : placeholder;
  }, [multi, value, values, items, placeholder]);

  const hasValue = multi ? values.length > 0 : (value != null && value.length > 0);

  const renderOptions = (options: SelectOption[]): React.JSX.Element[] =>
    options.map((option) => (
      <button
        key={option.value}
        type="button"
        role="option"
        aria-selected={isSelected(option.value)}
        aria-disabled={option.disabled}
        disabled={option.disabled === true}
        onClick={() => handleSelect(option)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left",
          "transition-colors duration-100 rounded-lg",
          option.disabled === true
            ? "text-zinc-300 cursor-not-allowed"
            : "text-zinc-700 hover:bg-zinc-50 cursor-pointer",
          isSelected(option.value) && option.disabled !== true && "text-zinc-900 font-medium bg-zinc-50",
        )}
      >
        <span>{option.label}</span>
        {isSelected(option.value) && (
          <span className="text-zinc-900 shrink-0"><CheckIcon /></span>
        )}
      </button>
    ));

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
      {/* Label */}
      {label != null && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none text-zinc-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger + dropdown */}
      <div ref={ref} className="relative">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "w-full flex items-center justify-between gap-2",
            "rounded-lg border bg-white px-3 py-2.5 text-sm",
            "transition-all duration-150 outline-none text-left",
            "border-zinc-200 hover:border-zinc-300",
            "focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10",
            open && "border-zinc-900 ring-2 ring-zinc-900/10",
            disabled && "opacity-50 cursor-not-allowed bg-zinc-50",
            className
          )}
        >
          <span className={cn("truncate", !hasValue && "text-zinc-400")}>
            {triggerLabel}
          </span>
          <ChevronDown open={open} />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            role="listbox"
            aria-multiselectable={multi}
            className={cn(
              "absolute top-full left-0 right-0 mt-1.5 z-50",
              "bg-white rounded-xl border border-zinc-100 shadow-lg",
              "p-1.5 max-h-60 overflow-y-auto",
              "animate-in fade-in-0 zoom-in-95 duration-100"
            )}
          >
            {items.map((item, idx) => {
              if (isGroup(item)) {
                return (
                  <div key={`${item.group}-${idx}`}>
                    {idx > 0 && <div className="my-1 border-t border-zinc-100" />}
                    <p className="px-3 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {item.group}
                    </p>
                    {renderOptions(item.options)}
                  </div>
                );
              }
              return renderOptions([item]);
            })}
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText != null && (
        <p className="text-xs text-zinc-400 leading-tight">{helperText}</p>
      )}

      {/* Multi: selected tags */}
      {multi && values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium px-2 py-0.5 rounded-md"
            >
              {getLabel(items, v)}
              <button
                type="button"
                aria-label={`Remove ${getLabel(items, v)}`}
                onClick={() => onChangeMulti?.(values.filter((val) => val !== v))}
                className="text-zinc-400 hover:text-zinc-700 transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

Select.displayName = "Select";