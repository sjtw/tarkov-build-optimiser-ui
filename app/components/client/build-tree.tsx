"use client";

import React, { useState } from "react";
import { Item } from "@/app/lib/definitions";
import { NodeCard, SlotBranch } from "@/app/components/client/tree";

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
    <div className="space-y-1.5 bg-[var(--tarkov-bg-900)]/40 p-6">
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
    <div className="space-y-2">
      <NodeCard item={item} depth={depth} isRoot={depth === 0} />

      {hasSlots && (
        <div className="space-y-2 border-l border-dashed border-[var(--tarkov-border)] pl-4">
          {slots.map((slot) => (
            <SlotBranch
              key={slot.id}
              name={slot.name}
              hasItem={Boolean(slot.item)}
              collapsed={Boolean(collapsedSlots[slot.id])}
              onToggle={() => toggleSlot(slot.id)}
            >
              {slot.item && !collapsedSlots[slot.id] ? (
                <TreeNode
                  item={slot.item}
                  depth={depth + 1}
                  collapsedSlots={collapsedSlots}
                  toggleSlot={toggleSlot}
                />
              ) : null}
            </SlotBranch>
          ))}
        </div>
      )}
    </div>
  );
}
