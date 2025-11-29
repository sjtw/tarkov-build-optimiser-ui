import React from "react";
import Panel from "@/app/components/ui/panel";

export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Filter Rail Skeleton */}
        <Panel className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-[var(--tarkov-panel-muted)]" />
              <div className="h-9 w-56 animate-pulse rounded bg-[var(--tarkov-panel-muted)]" />
            </div>
            <div className="h-8 w-28 animate-pulse rounded-lg bg-[var(--tarkov-panel-muted)]" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="space-y-4">
              <div className="h-5 w-32 animate-pulse rounded bg-[var(--tarkov-panel-muted)]" />
              <div className="grid gap-4 sm:grid-cols-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-16 w-full animate-pulse rounded-xl bg-[var(--tarkov-panel-muted)]"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-5 w-40 animate-pulse rounded bg-[var(--tarkov-panel-muted)]" />
              <div className="h-[360px] w-full animate-pulse rounded-2xl bg-[var(--tarkov-panel-muted)]" />
            </div>
          </div>
        </Panel>

        {/* Build Surface Skeleton */}
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
      </div>
    </div>
  );
}

