"use client";

import React from "react";
import { Button, Surface, Text } from "@/app/components/ui";

type SlotBranchProps = {
  name: string;
  hasItem: boolean;
  collapsed: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
};

export default function SlotBranch({
  name,
  hasItem,
  collapsed,
  onToggle,
  children,
}: SlotBranchProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between pr-2">
        <Text variant="meta">{name}</Text>
        {hasItem && (
          <Button
            onClick={onToggle}
            aria-label={collapsed ? "Expand slot" : "Collapse slot"}
            variant="icon"
          >
            {collapsed ? "▼" : "▲"}
          </Button>
        )}
      </div>
      {hasItem ? (
        collapsed ? (
          <Surface variant="soft" className="px-4 py-3 text-sm text-[var(--tarkov-text-muted)]">
            Attachment hidden
          </Surface>
        ) : (
          children
        )
      ) : (
        <Surface
          variant="soft"
          className="border-dashed px-4 py-3 text-sm text-[var(--tarkov-text-muted)]"
        >
          Empty / Default configuration
        </Surface>
      )}
    </div>
  );
}
