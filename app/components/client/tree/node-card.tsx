import React from "react";
import clsx from "clsx";
import { Item } from "@/app/lib/definitions";
import TarkovImage from "@/app/components/client/tarkov-image";
import StatLine from "@/app/components/client/tree/stat-line";
import NodeMeta from "@/app/components/client/tree/node-meta";
import { Surface, Badge } from "@/app/components/ui";

type NodeCardProps = {
  item: Item;
  depth: number;
  isRoot?: boolean;
};

export default function NodeCard({ item, depth, isRoot }: NodeCardProps) {
  return (
    <Surface
      variant="card"
      className={clsx("px-3 py-1.5", isRoot && "border-[var(--tarkov-highlight)]/50")}
    >
      <div className="flex min-h-[68px] flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
        <NodeMeta
          label={depth === 0 ? "Base Weapon" : "Attachment"}
          title={item.name}
          subtitle={item.id}
          media={
            <TarkovImage
              itemId={item.id}
              alt={item.name}
              width={96}
              height={96}
              className="h-24 w-24 flex-shrink-0"
            />
          }
        />
        <div className="flex flex-shrink-0 flex-col gap-0.5 text-right text-xs sm:w-28">
          <StatLine label="Ergonomics" value={item.ergonomics_modifier} kind="ergonomics" />
          <StatLine label="Recoil" value={item.recoil_modifier} kind="recoil" />
        </div>
        <div className="flex flex-shrink-0 justify-end lg:w-24">
          <Badge>{item.is_subtree ? "Optimised" : "Default"}</Badge>
        </div>
      </div>
    </Surface>
  );
}
