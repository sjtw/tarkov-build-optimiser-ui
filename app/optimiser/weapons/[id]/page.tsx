import React from "react";
import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";
import WeaponTreeVisualiser from "@/app/optimiser/weapons/[id]/weapon-tree-visualiser";
import WeaponPresetProvider from "@/app/ui/weapon-preset-context";

async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Partial<TraderLevels>> & { name: string };
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

  return (
    <WeaponPresetProvider>
      <WeaponTreeVisualiser
        id={id}
        name={p.name || "unknown"}
        levels={levels}
      />
    </WeaponPresetProvider>
  );
}

export default Page;
