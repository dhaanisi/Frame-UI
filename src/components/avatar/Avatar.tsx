import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ────────────────────────────────────────────────────────────────

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0",
    "overflow-hidden bg-zinc-100 text-zinc-600 font-medium select-none",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-14 h-14 text-base",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** URL of the avatar image */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Initials shown when image is unavailable (max 2 chars) */
  initials?: string;
  /** Icon shown when neither image nor initials are available */
  fallbackIcon?: React.ReactNode;
  /** Size variant */
  size?: VariantProps<typeof avatarVariants>["size"];
  /** Shape variant */
  shape?: VariantProps<typeof avatarVariants>["shape"];
}

// ─── Default fallback icon ───────────────────────────────────────────────────

const DefaultIcon = (): React.JSX.Element => (
  <svg
    width="55%"
    height="55%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const Avatar = ({
  src,
  alt = "",
  initials,
  fallbackIcon,
  size,
  shape,
  className,
  ...props
}: AvatarProps): React.JSX.Element => {
  const [imgError, setImgError] = React.useState<boolean>(false);

  const showImage = src != null && src.length > 0 && !imgError;
  const showInitials = !showImage && initials != null && initials.length > 0;
  const showIcon = !showImage && !showInitials;

  const handleError = (): void => {
    setImgError(true);
  };

  // reset error if src changes
  React.useEffect((): void => {
    setImgError(false);
  }, [src]);

  return (
    <span
      role="img"
      aria-label={alt.length > 0 ? alt : (initials ?? "avatar")}
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      {showImage && (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          className="w-full h-full object-cover"
        />
      )}

      {showInitials && (
        <span aria-hidden="true" className="uppercase tracking-wide leading-none">
          {initials.slice(0, 2)}
        </span>
      )}

      {showIcon && (
        <span aria-hidden="true" className="flex items-center justify-center w-full h-full text-zinc-400">
          {fallbackIcon != null ? fallbackIcon : <DefaultIcon />}
        </span>
      )}
    </span>
  );
};

Avatar.displayName = "Avatar";