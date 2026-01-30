import { cx } from "@/lib/cx";
import * as React from "react";

type CardVariant = "default" | "muted" | "outline" | "organic";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  hoverable?: boolean;
  noPadding?: boolean;
};

export function Card({
  className,
  variant = "default",
  hoverable = false,
  noPadding,
  ...props
}: CardProps) {
  const base =
  "rounded-2xl border border-[rgb(var(--border))] bg-white shadow-sm p-5";

  const variants: Record<CardVariant, string> = {
    default: "bg-white",
    muted: "bg-[rgb(var(--muted))]",
    outline: "bg-transparent",
    organic:
      "bg-white/80 backdrop-blur-md border-[rgb(var(--border))] shadow-[0_10px_30px_rgba(22,101,52,0.08),0_2px_10px_rgba(0,0,0,0.04)]",
  };

  const hover = hoverable ? "transition-shadow hover:shadow-md" : "transition-shadow";

  return (
    <div
      className={cx(base, variants[variant], hover, noPadding ? "p-0" : "", className)}
      {...props}
    />
  );
}