import { cx } from "@/lib/cx";
import * as React from "react";

type PillVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive";

export type PillProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: PillVariant;
  leftIcon?: React.ReactNode;
};

export function Pill({
  className,
  variant = "secondary",
  leftIcon,
  children,
  ...props
}: PillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium";

  const variants: Record<PillVariant, string> = {
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
  };

  return (
    <span className={cx(base, variants[variant], className)} {...props}>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      {children}
    </span>
  );
}