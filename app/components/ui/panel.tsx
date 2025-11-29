import React from "react";
import clsx from "clsx";

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function Panel({
  children,
  title,
  actions,
  className,
}: PanelProps) {
  return (
    <section className={clsx("panel-surface", className)}>
      {(title || actions) && (
        <header className="mb-4 flex items-center justify-between text-sm uppercase tracking-wide text-[var(--tarkov-text-muted)]">
          {title && <span>{title}</span>}
          {actions && <div>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
