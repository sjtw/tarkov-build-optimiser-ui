import React from "react";
import Panel from "@/app/ui/panel";

export default function BuildSurfaceSkeleton() {
  return (
    <>
      <Panel>
        <div className="flex animate-pulse flex-col gap-4 lg:flex-row lg:items-center">
          <div className="h-24 w-24 rounded-xl bg-[var(--tarkov-panel-muted)]"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 w-52 rounded bg-[var(--tarkov-panel-muted)]" />
            <div className="h-4 w-32 rounded bg-[var(--tarkov-panel-muted)]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-12 w-28 rounded-xl bg-[var(--tarkov-panel-muted)]"
              />
            ))}
          </div>
        </div>
      </Panel>
      <Panel>
        <div className="h-[360px] animate-pulse rounded-2xl bg-[var(--tarkov-panel-muted)]" />
      </Panel>
    </>
  );
}
