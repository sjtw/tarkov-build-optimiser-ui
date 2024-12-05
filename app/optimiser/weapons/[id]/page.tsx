import React from "react";
import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";
import WeaponTreeVisualiser from "@/app/optimiser/weapons/[id]/weapon-tree-visualiser";
import Box from "@/app/ui/box";
import { getOptimumBuild } from "@/app/lib/optimiser-api";

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

  try {
    const build = await getOptimumBuild(id, levels);
    return <Box>{build && <WeaponTreeVisualiser weapon={build} />}</Box>;
  } catch (error) {
    return (
      <Box>
        Failed to fetch optimum build for weapon {id}.{" "}
        {(error as Error).message}
      </Box>
    );
  }
}

export default Page;
