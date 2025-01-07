import React from "react";
import { TraderLevels } from "@/app/lib/definitions";
import { getOptimumBuild } from "@/app/lib/optimiser-api";
import Box from "@/app/ui/box";
import ItemBox from "@/app/ui/item-box";
import { EvaluationStatus } from "@/app/optimiser/weapons/[id]/details";

async function WeaponTreeVisualiser({
  id,
  levels,
  name,
}: {
  id: string;
  levels: TraderLevels;
  name: string;
}) {
  try {
    const build = await getOptimumBuild(id, levels);
    return (
      <Box>
        {build && build.status === "Completed" && (
          <div className="rounded-md p-4">
            <ul>
              <li>Weapon: {build.name}</li>
              <li>Total Ergonomics: {build.ergonomics_sum}</li>
              <li>Total Recoil: {build.recoil_sum}</li>
            </ul>
            <ItemBox item={build} />
          </div>
        )}
        {build && build.status !== "Completed" && (
          <EvaluationStatus id={id} name={name} status={build.status} />
        )}
      </Box>
    );
  } catch (error) {
    return (
      <Box>
        Failed to fetch optimum build for weapon {id}.{" "}
        {(error as Error).message}
      </Box>
    );
  }
}

export default WeaponTreeVisualiser;
