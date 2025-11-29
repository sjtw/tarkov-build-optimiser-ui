import React from "react";
import clsx from "clsx";

type StatBadgeProps = {
  label: string;
  value: React.ReactNode;
  tone?: "neutral" | "positive" | "negative" | "warning";
  className?: string;
};

const toneClasses: Record<NonNullable<StatBadgeProps["tone"]>, string> = {
  neutral: "bg-[var(--tarkov-panel-muted)] text-slate-200",
  positive:
    "bg-gradient-to-r from-[var(--tarkov-accent)]/30 to-[var(--tarkov-accent-strong)]/10 text-[var(--tarkov-accent-strong)]",
  negative:
    "bg-gradient-to-r from-[var(--tarkov-danger)]/30 to-[var(--tarkov-danger)]/10 text-[var(--tarkov-danger)]",
  warning:
    "bg-gradient-to-r from-[var(--tarkov-warning)]/30 to-[var(--tarkov-warning)]/5 text-[var(--tarkov-warning)]",
};

export default function StatBadge({
  label,
  value,
  tone = "neutral",
  className,
}: StatBadgeProps) {
  return (
    <div
      className={clsx(
        "min-w-[120px] rounded-xl border border-[var(--tarkov-border-strong)] px-4 py-3 text-xs uppercase tracking-widest",
        toneClasses[tone],
        className,
      )}
    >
      <div className="text-[10px] text-[var(--tarkov-text-muted)]">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
