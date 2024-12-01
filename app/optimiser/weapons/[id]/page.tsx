import React from "react";
import { getOptimumBuild } from "@/app/lib/queries";
import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";
import WeaponTreeVisualiser from "@/app/optimiser/weapons/[id]/weapon-tree-visualiser";
import Box from "@/app/ui/box";

async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Partial<TraderLevels>;
}) {
  const { id } = await props.params;
  const p = await props.searchParams;
  const levels: TraderLevels = {
    [TraderLevelNames.Prapor]: p[TraderLevelNames.Prapor] || "4",
    [TraderLevelNames.Peacekeeper]: p[TraderLevelNames.Peacekeeper] || "4",
    [TraderLevelNames.Mechanic]: p[TraderLevelNames.Mechanic] || "4",
    [TraderLevelNames.Jager]: p[TraderLevelNames.Jager] || "4",
    [TraderLevelNames.Skier]: p[TraderLevelNames.Skier] || "4",
  };
  const build = await getOptimumBuild(id, levels);

  return (
    <Box>
      <WeaponTreeVisualiser weapon={build} />
    </Box>
  );
}

export default Page;
