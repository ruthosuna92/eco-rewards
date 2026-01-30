import * as React from "react";
import { Card } from "@/components/ui/Card";
import { cx } from "@/lib/cx";

type StatCardVariant = "default" | "muted" | "outline";

export type StatCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  variant?: StatCardVariant;
  className?: string;
};

export function StatCard({
  icon,
  label,
  value,
  hint,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <Card
      variant={variant}
      className={cx("p-5", className)}
      hoverable
      aria-label={typeof label === "string" ? label : undefined}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
            {icon}
          </div>
        ) : null}

        <div className="min-w-0">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">{label}</p>
          <div className="mt-1 text-xl font-semibold text-[rgb(var(--foreground))]">
            {value}
          </div>
          {hint ? (
            <div className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
              {hint}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}