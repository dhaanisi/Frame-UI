import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> {
  /** Label text */
  children: React.ReactNode;
  /** Marks the field as required — shows a red asterisk */
  required?: boolean;
  /** Marks the field as optional — shows a muted "(optional)" tag */
  optional?: boolean;
  /** Visually and semantically disables the label */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      required = false,
      optional = false,
      disabled = false,
      size = "md",
      className,
      ...props
    },
    ref
  ): React.JSX.Element => {
    return (
      <label
        ref={ref}
        aria-disabled={disabled}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium leading-none select-none",
          // size
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
          // disabled
          disabled
            ? "text-zinc-400 cursor-not-allowed"
            : "text-zinc-700 cursor-default",
          className
        )}
        {...props}
      >
        {children}

        {/* Required indicator */}
        {required && !optional && (
          <span
            aria-hidden="true"
            className={cn(
              "font-semibold",
              disabled ? "text-red-300" : "text-red-500"
            )}
          >
            *
          </span>
        )}

        {/* Optional indicator */}
        {optional && !required && (
          <span
            className={cn(
              "font-normal",
              disabled ? "text-zinc-300" : "text-zinc-400",
              size === "sm" && "text-xs",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}
          >
            (optional)
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
