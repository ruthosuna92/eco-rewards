import * as React from "react";
import { Search } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
};

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  containerClassName = "",
  id,
  name,
  ...props
}: InputProps) {
  const reactId = React.useId();
  const inputId = id ?? name ?? reactId;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-semibold text-[rgb(var(--foreground))]"
        >
          {label}
        </label>
      ) : null}

      <div
        className={[
          "relative",
          "rounded-2xl",
          "border",
          "bg-white/80 backdrop-blur-md",
          "shadow-sm",
          "transition-all",
          error ? "border-red-300" : "border-[rgb(var(--border))]",
          "focus-within:eco-ring",
          "focus-within:border-[rgb(var(--ring))]",
        ].join(" ")}
      >
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]">
            {leftIcon}
          </span>
        ) : null}

        <input
          id={inputId}
          name={name}
          className={[
            "h-11 w-full rounded-2xl bg-transparent px-4 text-sm outline-none",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            "placeholder:text-[rgb(var(--muted-foreground))]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          ].join(" ")}
          {...props}
        />

        {rightIcon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

export function SearchInput(props: Omit<InputProps, "leftIcon">) {
  return <Input leftIcon={<Search className="h-4 w-4" />} {...props} />;
}