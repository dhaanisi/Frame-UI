import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // adjust to your utils path

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide",
    "transition-all duration-300 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
          "hover:bg-[var(--color-primary-hover)]",
          "focus-visible:ring-[var(--color-ring)]",
        ],
        secondary: [
          "bg-transparent text-white",
          "border border-[#B0C4B1]",
          "hover:bg-[#B0C4B1] hover:text-[var(--color-primary-fg)]",
          "focus-visible:ring-[#B0C4B1]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-text-subtle)]",
          "hover:bg-[var(--color-secondary-subtle)] hover:text-[var(--color-text)]",
          "focus-visible:ring-[var(--color-ring)]",
        ],
        destructive: [
          "bg-red-600 text-white",
          "hover:bg-red-500",
          "focus-visible:ring-red-600",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--radius-md)]",
        md: "h-10 px-4 text-sm rounded-[var(--radius-lg)]",
        lg: "h-12 px-6 text-base rounded-[var(--radius-xl)]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  /** Button label */
  children?: React.ReactNode;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Icon rendered before the label */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label */
  trailingIcon?: React.ReactNode;
}

const Spinner = (): React.JSX.Element => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leadingIcon,
      trailingIcon,
      children,
      disabled,
      ...props
    },
    ref
  ): React.JSX.Element => {
    return (
      <button
        ref={ref}
        disabled={disabled === true || loading}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : leadingIcon != null ? (
          <span className="shrink-0">{leadingIcon}</span>
        ) : null}

        {children != null && <span>{children}</span>}

        {!loading && trailingIcon != null && (
          <span className="shrink-0">{trailingIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
