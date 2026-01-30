import { cx } from "@/lib/cx";
import * as React from "react";

type ListItemVariant = "default" | "success" | "warning" | "destructive";

export type ListItemProps = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ListItemVariant;
  className?: string;
};

export function ListItem({
  icon,
  title,
  description,
  variant = "default",
  className,
}: ListItemProps) {
  const leftStyles: Record<ListItemVariant, string> = {
    default: "bg-[rgb(var(--muted))] border-[rgb(var(--border))]",
    success: "bg-[rgb(var(--success))]/10 border-[rgb(var(--success))]/25",
    warning: "bg-[rgb(var(--warning))]/10 border-[rgb(var(--warning))]/25",
    destructive: "bg-[rgb(var(--error))]/10 border-[rgb(var(--error))]/25",
  };

  return (
    <div
      className={cx(
        "flex items-start gap-3 rounded-2xl border border-[rgb(var(--border))] bg-white p-4",
        className
      )}
    >
      {icon ? (
        <div
          className={cx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
            leftStyles[variant]
          )}
        >
          {icon}
        </div>
      ) : null}

      <div className="min-w-0">
        <div className="font-medium text-[rgb(var(--foreground))]">{title}</div>
        {description ? (
          <div className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}