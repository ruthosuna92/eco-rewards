import { cx } from "@/lib/cx";
import * as React from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 " +
      "ring-offset-[rgb(var(--background))] disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<ButtonVariant, string> = {
      default:
        "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-95",
      secondary:
        "bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:opacity-95",
      outline:
        "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]",
      ghost:
        "bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]",
      destructive:
        "bg-[rgb(var(--error))] text-white hover:opacity-95",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-5 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cx(base, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";