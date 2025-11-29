"use client";

import React from "react";
import Panel from "@/app/components/ui/panel";
import { Button } from "@/app/components/ui";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Panel className="flex flex-col items-center justify-center gap-6 py-16 text-center">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-[var(--tarkov-text-muted)]">
              {error.message || "An unexpected error occurred"}
            </p>
            {error.digest && (
              <p className="mt-1 text-xs text-[var(--tarkov-text-muted)]">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
        </Panel>
      </div>
    </div>
  );
}

