import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type InputType = "text" | "email" | "password" | "number" | "search";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Input type */
  type?: InputType;
  /** Label shown above the input */
  label?: string;
  /** Error message — puts input in error state when provided */
  error?: string;
  /** Icon rendered on the left inside the input */
  leadingIcon?: React.ReactNode;
  /** Icon rendered on the right inside the input */
  trailingIcon?: React.ReactNode;
  /** Show character count (requires maxLength to be set) */
  showCount?: boolean;
  /** Additional class for the outer wrapper */
  wrapperClassName?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      error,
      leadingIcon,
      trailingIcon,
      showCount = false,
      maxLength,
      wrapperClassName,
      className,
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ): React.JSX.Element => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    // track value internally only when showCount is needed
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof defaultValue === "string" || typeof defaultValue === "number"
        ? String(defaultValue)
        : ""
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : internalValue;
    const charCount = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const hasError = error != null && error.length > 0;
    const hasLeading = leadingIcon != null;
    const hasTrailing = trailingIcon != null;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
        {/* Label */}
        {label != null && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none",
              hasError ? "text-red-500" : "text-[var(--color-text-subtle)]",
              disabled === true && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Leading icon */}
          {hasLeading && (
            <span
              className={cn(
                "absolute left-3 flex items-center pointer-events-none",
                hasError ? "text-red-400" : "text-[var(--color-text-muted)]"
              )}
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            maxLength={maxLength}
            disabled={disabled}
            value={isControlled ? value : internalValue}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : showCount && maxLength != null ? `${inputId}-count` : undefined
            }
            className={cn(
              // base
              "w-full rounded-lg border bg-[var(--color-surface)] text-sm text-[var(--color-text)]",
              "placeholder:text-[var(--color-text-muted)]",
              "transition-all duration-150 ease-out outline-none",
              // padding — adjust for icons
              hasLeading ? "pl-9" : "pl-3",
              hasTrailing ? "pr-9" : "pr-3",
              "py-2.5",
              // default border & focus
              !hasError && [
                "border-[var(--color-border)]",
                "hover:border-[var(--color-border-strong)]",
                "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10",
              ],
              // error state
              hasError && [
                "border-red-400",
                "hover:border-red-500",
                "focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
              ],
              // disabled
              disabled === true && "opacity-50 cursor-not-allowed bg-[var(--color-bg-subtle)]",
              className
            )}
            {...props}
          />

          {/* Trailing icon */}
          {hasTrailing && (
            <span
              className={cn(
                "absolute right-3 flex items-center pointer-events-none",
                hasError ? "text-red-400" : "text-[var(--color-text-muted)]"
              )}
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Footer: error or character count */}
        <div className="flex items-start justify-between gap-2 min-h-[1.25rem]">
          {hasError ? (
            <p
              id={`${inputId}-error`}
              className="text-xs text-red-600 leading-tight"
            >
              {error}
            </p>
          ) : (
            <span />
          )}

          {showCount && maxLength != null && (
            <p
              id={`${inputId}-count`}
              className={cn(
                "text-xs tabular-nums shrink-0 ml-auto",
                charCount >= maxLength ? "text-red-500" : "text-[var(--color-text-muted)]"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";