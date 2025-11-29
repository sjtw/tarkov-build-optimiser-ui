"use client";

import React, { useState } from "react";
import { Item, Slot } from "@/app/lib/definitions";
import TarkovImage from "@/app/ui/tarkov-image";
import clsx from "clsx";

type BuildTreeProps = {
  build: Item;
};

export default function BuildTree({ build }: BuildTreeProps) {
  const [collapsedSlots, setCollapsedSlots] = useState<Record<string, boolean>>(
    {},
  );

  const toggleSlot = (slotId: string) => {
    setCollapsedSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  return (
    <div className="space-y-6 bg-[var(--tarkov-bg-900)]/40 p-6">
      <TreeNode
        item={build}
        depth={0}
        collapsedSlots={collapsedSlots}
        toggleSlot={toggleSlot}
      />
    </div>
  );
}

type TreeNodeProps = {
  item: Item;
  depth: number;
  collapsedSlots: Record<string, boolean>;
  toggleSlot: (slotId: string) => void;
};

function TreeNode({ item, depth, collapsedSlots, toggleSlot }: TreeNodeProps) {
  const slots = item.slots || [];
  const hasSlots = slots.length > 0;

  return (
    <div className="space-y-1.5">
      <div
        className={clsx(
          "rounded-lg border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/70 px-3 py-1.5",
          depth === 0 && "border-[var(--tarkov-highlight)]/50",
        )}
      >
        <div className="flex min-h-[68px] flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <TarkovImage
              itemId={item.id}
              alt={item.name}
              width={96}
              height={96}
              className="h-24 w-24 flex-shrink-0"
            />
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
                {depth === 0 ? "Base Weapon" : "Attachment"}
              </p>
              <h3 className="truncate text-xl font-semibold text-white">
                {item.name}
              </h3>
              <p className="truncate text-sm text-[var(--tarkov-text-muted)]">
                {item.id}
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-0.5 text-right text-xs sm:w-28">
            <Stat
              label="Ergonomics"
              value={item.ergonomics_modifier}
              kind="ergonomics"
            />
            <Stat label="Recoil" value={item.recoil_modifier} kind="recoil" />
          </div>
          <div className="flex flex-shrink-0 justify-end lg:w-24">
            <span className="whitespace-nowrap rounded-md border border-[var(--tarkov-border)] px-3 py-0.5 text-[11px] uppercase tracking-widest text-[var(--tarkov-text-muted)]">
              {item.is_subtree ? "Optimised" : "Default"}
            </span>
          </div>
        </div>
      </div>

      {hasSlots && (
        <div className="space-y-2 border-l border-dashed border-[var(--tarkov-border)] pl-4">
          {slots.map((slot) => (
            <SlotBranch
              key={slot.id}
              slot={slot}
              depth={depth + 1}
              collapsed={collapsedSlots[slot.id]}
              toggleSlot={toggleSlot}
              collapsedSlots={collapsedSlots}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type SlotBranchProps = {
  slot: Slot;
  depth: number;
  collapsed?: boolean;
  toggleSlot: (slotId: string) => void;
  collapsedSlots: Record<string, boolean>;
};

function SlotBranch({
  slot,
  depth,
  collapsed,
  toggleSlot,
  collapsedSlots,
}: SlotBranchProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between pr-2">
        <div className="text-xs uppercase tracking-[0.4em] text-[var(--tarkov-text-muted)]">
          {slot.name}
        </div>
        {slot.item && (
          <button
            onClick={() => toggleSlot(slot.id)}
            aria-label={collapsed ? "Expand slot" : "Collapse slot"}
            className="flex h-6 w-6 items-center justify-center rounded-md text-xs tracking-[0.3em] text-[var(--tarkov-text-muted)] transition hover:bg-[var(--tarkov-panel-muted)] hover:text-white"
          >
            {collapsed ? "▼" : "▲"}
          </button>
        )}
      </div>
      {slot.item ? (
        collapsed ? (
          <div className="rounded-xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/40 px-4 py-3 text-sm text-[var(--tarkov-text-muted)]">
            Attachment hidden
          </div>
        ) : (
          <TreeNode
            item={slot.item}
            depth={depth}
            collapsedSlots={collapsedSlots}
            toggleSlot={toggleSlot}
          />
        )
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--tarkov-border)] bg-[var(--tarkov-panel)]/50 px-4 py-3 text-sm text-[var(--tarkov-text-muted)]">
          Empty / Default configuration
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  kind,
}: {
  label: string;
  value: number;
  kind: "ergonomics" | "recoil";
}) {
  const isPositive = value >= 0;
  const tone =
    kind === "ergonomics"
      ? isPositive
        ? "text-[var(--tarkov-accent-strong)]"
        : "text-[var(--tarkov-danger)]"
      : !isPositive
        ? "text-[var(--tarkov-accent-strong)]"
        : "text-[var(--tarkov-danger)]";

  return (
    <div className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-widest text-[var(--tarkov-text-muted)] whitespace-nowrap">
      <span>{label}:</span>
      <span className={clsx("text-sm font-semibold", tone)}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}
