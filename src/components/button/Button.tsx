import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // adjust to your utils path

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide",
    "transition-all duration-300 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-[var(--color-bg)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97] active:translate-y-0",
  ],
  {
    variants: {
      variant: {
        // Primary — lift + deeper shadow on hover
        primary: [
          "relative bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
          "shadow-[0_1px_2px_rgb(0_0_0/0.3)]",
          "hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_color-mix(in_srgb,var(--color-primary)_50%,transparent)]",
        ],

        // Secondary — split: left accent bar + outlined body, fills on hover
        secondary: [
          "relative bg-transparent text-[var(--color-text)]",
          "border border-[var(--color-primary)]",
          "before:absolute before:inset-y-0 before:left-0 before:w-1",
          "before:bg-[var(--color-primary)] before:rounded-l-[inherit]",
          "before:transition-all before:duration-300 before:ease-in-out",
          "hover:before:w-full hover:text-[var(--color-primary-fg)]",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-4px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
          "overflow-hidden",
          "[&>*]:relative [&>*]:z-10",
        ],

        // Ghost — glow ring blooms on hover
        ghost: [
          "bg-transparent text-[var(--color-text-subtle)]",
          "ring-1 ring-transparent",
          "hover:text-[var(--color-primary)]",
          "hover:ring-[var(--color-primary)]",
          "hover:shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]",
          "hover:bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]",
        ],

        // Destructive — lift + red glow
        destructive: [
          "bg-red-600 text-white",
          "shadow-[0_1px_2px_rgb(0_0_0/0.3)]",
          "hover:-translate-y-0.5 hover:bg-red-500",
          "hover:shadow-[0_8px_20px_-4px_rgb(220_38_38/0.5)]",
          "focus-visible:ring-red-500",
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