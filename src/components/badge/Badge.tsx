import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-medium leading-none",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        solid: "bg-zinc-900 text-white",
        soft:  "bg-zinc-100 text-zinc-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-md",
        md: "px-2.5 py-1 text-xs rounded-lg",
        lg: "px-3 py-1.5 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "md",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Badge label */
  children: React.ReactNode;
  /** Visual style */
  variant?: VariantProps<typeof badgeVariants>["variant"];
  /** Size */
  size?: VariantProps<typeof badgeVariants>["size"];
  /** Icon rendered before the label */
  leadingIcon?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Badge = ({
  children,
  variant,
  size,
  leadingIcon,
  className,
  ...props
}: BadgeProps): React.JSX.Element => {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {leadingIcon != null && (
        <span className="shrink-0 flex items-center">{leadingIcon}</span>
      )}
      {children}
    </span>
  );
};

Badge.displayName = "Badge";