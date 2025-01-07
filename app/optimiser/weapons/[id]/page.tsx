import React from "react";
import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";
import WeaponTreeVisualiser from "@/app/optimiser/weapons/[id]/weapon-tree-visualiser";

async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Partial<TraderLevels>>;
}) {
  const { id } = await props.params;
  const p = await props.searchParams;
  const levels: TraderLevels = {
    [TraderLevelNames.Prapor]: p[TraderLevelNames.Prapor] || "4",
    [TraderLevelNames.Peacekeeper]: p[TraderLevelNames.Peacekeeper] || "4",
    [TraderLevelNames.Mechanic]: p[TraderLevelNames.Mechanic] || "4",
    [TraderLevelNames.Jaeger]: p[TraderLevelNames.Jaeger] || "4",
    [TraderLevelNames.Skier]: p[TraderLevelNames.Skier] || "4",
  };

  return <WeaponTreeVisualiser id={id} levels={levels} />;
}

export default Page;
