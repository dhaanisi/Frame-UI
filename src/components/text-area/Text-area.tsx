import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> {
  /** Label shown above the textarea */
  label?: string;
  /** Show character count (requires maxLength) */
  showCount?: boolean;
  /** Additional class for the outer wrapper */
  wrapperClassName?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      showCount = false,
      maxLength,
      wrapperClassName,
      className,
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ): React.JSX.Element => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

    // merge forwarded ref + inner ref
    const setRef = (node: HTMLTextAreaElement | null): void => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    };

    // controlled vs uncontrolled value tracking
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof defaultValue === "string" || typeof defaultValue === "number"
        ? String(defaultValue)
        : ""
    );
    const currentValue = isControlled ? String(value ?? "") : internalValue;
    const charCount = currentValue.length;

    // auto-grow: recalculate height whenever value changes
    React.useEffect((): void => {
      const el = innerRef.current;
      if (el == null) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
        {/* Label */}
        {label != null && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none text-zinc-700",
              disabled === true && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={setRef}
          id={inputId}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          value={isControlled ? value : internalValue}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          aria-describedby={
            showCount && maxLength != null ? `${inputId}-count` : undefined
          }
          className={cn(
            "w-full rounded-lg border bg-white text-sm text-zinc-900",
            "placeholder:text-zinc-400 resize-none overflow-hidden",
            "transition-all duration-150 ease-out outline-none",
            "px-3 py-2.5",
            "border-zinc-200 hover:border-zinc-300",
            "focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10",
            disabled === true && "opacity-50 cursor-not-allowed bg-zinc-50",
            className
          )}
          {...props}
        />

        {/* Character count */}
        {showCount && maxLength != null && (
          <p
            id={`${inputId}-count`}
            className={cn(
              "text-xs tabular-nums self-end",
              charCount >= maxLength ? "text-red-500" : "text-zinc-400"
            )}
          >
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
