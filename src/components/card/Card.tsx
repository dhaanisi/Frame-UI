import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Card Root ───────────────────────────────────────────────────────────────

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Makes the entire card clickable with hover/active states */
  clickable?: boolean;
}

const CardRoot = ({
  children,
  clickable = false,
  className,
  ...props
}: CardProps): React.JSX.Element => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-zinc-100",
        "overflow-hidden flex flex-col",
        "transition-all duration-200 ease-out",
        clickable && [
          "cursor-pointer",
          "hover:shadow-md hover:-translate-y-0.5",
          "active:scale-[0.99] active:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
        ],
        className
      )}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? "button" : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

CardRoot.displayName = "Card";

// ─── Card.Image ──────────────────────────────────────────────────────────────

export interface CardImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio class e.g. "aspect-video" or "aspect-square" */
  aspectRatio?: string;
}

const CardImage = ({
  src,
  alt = "",
  aspectRatio = "aspect-video",
  className,
  ...props
}: CardImageProps): React.JSX.Element => {
  return (
    <div className={cn("w-full overflow-hidden", aspectRatio)}>
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
    </div>
  );
};

CardImage.displayName = "Card.Image";

// ─── Card.Header ─────────────────────────────────────────────────────────────

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
}

const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps): React.JSX.Element => {
  return (
    <div
      className={cn(
        "px-5 pt-5 pb-3 flex flex-col gap-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

CardHeader.displayName = "Card.Header";

// ─── Card.Title ──────────────────────────────────────────────────────────────

export interface CardTitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "children"> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = ({
  children,
  as: Tag = "h3",
  className,
  ...props
}: CardTitleProps): React.JSX.Element => {
  return (
    <Tag
      className={cn("text-base font-semibold text-zinc-900 leading-snug", className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

CardTitle.displayName = "Card.Title";

// ─── Card.Description ────────────────────────────────────────────────────────

export interface CardDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "children"> {
  children: React.ReactNode;
}

const CardDescription = ({
  children,
  className,
  ...props
}: CardDescriptionProps): React.JSX.Element => {
  return (
    <p
      className={cn("text-sm text-zinc-500 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};

CardDescription.displayName = "Card.Description";

// ─── Card.Body ───────────────────────────────────────────────────────────────

export interface CardBodyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
}

const CardBody = ({
  children,
  className,
  ...props
}: CardBodyProps): React.JSX.Element => {
  return (
    <div
      className={cn("px-5 py-3 flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
};

CardBody.displayName = "Card.Body";

// ─── Card.Footer ─────────────────────────────────────────────────────────────

export interface CardFooterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
}

const CardFooter = ({
  children,
  className,
  ...props
}: CardFooterProps): React.JSX.Element => {
  return (
    <div
      className={cn(
        "px-5 py-4 mt-auto border-t border-zinc-100",
        "flex items-center gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = "Card.Footer";

// ─── Compose ─────────────────────────────────────────────────────────────────

export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});