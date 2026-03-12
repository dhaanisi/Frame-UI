import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the separator */
  orientation?: "horizontal" | "vertical";
  /** Line style */
  variant?: "solid" | "dashed";
  /** Optional label shown in the middle (horizontal only) */
  label?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Separator = ({
  orientation = "horizontal",
  variant = "solid",
  label,
  className,
  ...props
}: SeparatorProps): React.JSX.Element => {
  const isHorizontal = orientation === "horizontal";
  const isDashed = variant === "dashed";
  const hasLabel = label != null && isHorizontal;

  const lineClasses = cn(
    "border-zinc-200",
    isDashed ? "border-dashed" : "border-solid",
    isHorizontal ? "border-t w-full" : "border-l h-full"
  );

  if (hasLabel) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-3 w-full", className)}
        {...props}
      >
        <div className={lineClasses} />
        <span className="shrink-0 text-xs text-zinc-400 font-medium leading-none">
          {label}
        </span>
        <div className={lineClasses} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        isHorizontal ? "w-full" : "inline-flex self-stretch",
        className
      )}
      {...props}
    >
      <div className={lineClasses} />
    </div>
  );
};

Separator.displayName = "Separator";