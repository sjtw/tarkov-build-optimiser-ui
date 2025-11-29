import React from "react";
import clsx from "clsx";

const variantMap = {
  primary:
    "rounded-full border border-[var(--tarkov-highlight)] px-4 py-2 text-xs uppercase tracking-widest text-[var(--tarkov-highlight)] transition hover:border-white hover:text-white",
  outline:
    "rounded-lg border border-[var(--tarkov-border-strong)] px-3 py-2 text-sm text-white transition hover:border-[var(--tarkov-highlight)]",
  pill:
    "rounded-lg border border-[var(--tarkov-border)] px-2 py-1 text-sm text-[var(--tarkov-text-muted)] transition hover:border-[var(--tarkov-border-strong)] hover:text-white",
  icon:
    "flex h-6 w-6 items-center justify-center rounded-md text-xs tracking-[0.3em] text-[var(--tarkov-text-muted)] transition hover:bg-[var(--tarkov-panel-muted)] hover:text-white",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantMap;
};

export default function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx(variantMap[variant], className)} {...props}>
      {children}
    </button>
  );
}
