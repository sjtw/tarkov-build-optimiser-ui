import React from "react";
import Panel from "@/app/ui/panel";
import clsx from "clsx";

type DataStateProps = {
  title: string;
  description?: string;
  tone?: "neutral" | "warning" | "danger";
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export default function DataState({
  title,
  description,
  tone = "neutral",
  action,
  icon,
  className,
}: DataStateProps) {
  return (
    <Panel
      className={clsx(
        "flex flex-col items-start justify-center gap-3 text-left",
        tone === "warning" && "border-[var(--tarkov-warning)]/60",
        tone === "danger" && "border-[var(--tarkov-danger)]/60",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          {description && (
            <p className="text-sm text-[var(--tarkov-text-muted)]">
              {description}
            </p>
          )}
        </div>
      </div>
      {action}
    </Panel>
  );
}
