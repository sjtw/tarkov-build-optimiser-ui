import React from "react";
import { TraderLevels } from "@/app/lib/definitions";
import { getOptimumBuild } from "@/app/lib/optimiser-api";
import DataState from "@/app/ui/data-state";
import Panel from "@/app/ui/panel";
import BuildTree from "@/app/optimiser-v2/_components/build-tree";
import BuildSummary from "@/app/optimiser-v2/_components/build-summary";

type BuildSurfaceProps = {
  weaponId?: string;
  weaponName?: string;
  weaponPresetId?: string;
  traderLevels: TraderLevels;
};

export default async function BuildSurface({
  weaponId,
  weaponName,
  weaponPresetId,
  traderLevels,
}: BuildSurfaceProps) {
  if (!weaponId) {
    return (
      <DataState
        title="Select a weapon to begin"
        description="Choose a trader setup and weapon to generate the optimal configuration."
        action={
          <p className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
            Tip: presets update in real time as you tweak trader levels.
          </p>
        }
      />
    );
  }

  try {
    const build = await getOptimumBuild(weaponId, traderLevels);

    if (!build) {
      return (
        <DataState
          title="No build data yet"
          description="The optimiser has not evaluated this weapon with the selected trader levels."
        />
      );
    }

    if (build.status !== "Completed") {
      const statusCopy =
        build.status === "Pending"
          ? "This weapon is queued for evaluation. Check back soon."
          : build.status === "InProgress"
          ? "Optimisation in progress. We will refresh automatically once completed."
          : "We could not complete this evaluation. Please retry later.";

      return (
        <DataState
          title={`Build status: ${build.status}`}
          description={statusCopy}
          tone={build.status === "Failed" ? "danger" : "warning"}
        />
      );
    }

    return (
      <>
        <BuildSummary
          build={build}
          traderLevels={traderLevels}
          weaponName={weaponName}
          weaponPresetId={weaponPresetId}
          weaponId={weaponId}
        />
        <Panel className="p-0">
          <BuildTree build={build} />
        </Panel>
      </>
    );
  } catch (error) {
    return (
      <DataState
        title="Unable to load build"
        description={
          error instanceof Error ? error.message : "Unexpected error occurred."
        }
        tone="danger"
        action={
          <p className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
            Try reloading the page or choose a different weapon.
          </p>
        }
      />
    );
  }
}
