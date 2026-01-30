import { cx } from "@/lib/cx";
import * as React from "react";

type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive"
  | "neutral";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";

  const variants: Record<BadgeVariant, string> = {
    default:
      "bg-[rgb(var(--primary))]/10 text-[rgb(var(--foreground))] border border-[rgb(var(--primary))]/15",
    secondary:
      "bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))]",
    outline:
      "bg-transparent text-[rgb(var(--foreground))] border border-[rgb(var(--border))]",
    success:
      "bg-[rgb(var(--success))]/10 text-[rgb(var(--foreground))] border border-[rgb(var(--success))]/20",
    warning:
      "bg-[rgb(var(--warning))]/10 text-[rgb(var(--foreground))] border border-[rgb(var(--warning))]/20",
    destructive:
      "bg-[rgb(var(--error))]/10 text-[rgb(var(--foreground))] border border-[rgb(var(--error))]/20",
    neutral:
      "bg-white/90 text-[rgb(var(--foreground))] border border-[rgb(var(--border))] backdrop-blur-md",
  };

  return <span className={cx(base, variants[variant], className)} {...props} />;
}