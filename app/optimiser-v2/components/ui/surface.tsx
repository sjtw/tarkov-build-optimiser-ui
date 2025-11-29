import React from "react";
import clsx from "clsx";

const variantMap = {
  panel: "rounded-2xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/60",
  card: "rounded-lg border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/70",
  soft: "rounded-xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel)]/40",
  inset: "rounded-xl border border-[var(--tarkov-border-strong)] bg-[var(--tarkov-bg-800)]/85",
} as const;

type SurfaceProps<T extends React.ElementType> = {
  as?: T;
  variant?: keyof typeof variantMap;
  className?: string;
  children: React.ReactNode;
};

export default function Surface<T extends React.ElementType = "div">({
  as,
  variant = "panel",
  className,
  children,
  ...props
}: SurfaceProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof SurfaceProps<T>>) {
  const Component = as || "div";

  return (
    <Component className={clsx(variantMap[variant], className)} {...props}>
      {children}
    </Component>
  );
}
