import React from "react";
import clsx from "clsx";

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "whitespace-nowrap rounded-md border border-[var(--tarkov-border)] px-3 py-0.5 text-[11px] uppercase tracking-widest text-[var(--tarkov-text-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
