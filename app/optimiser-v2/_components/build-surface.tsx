import React from "react";
import { TraderLevels, WeaponTree } from "@/app/lib/definitions";
import { getOptimumBuild } from "@/app/lib/optimiser-api";
import DataState from "@/app/ui/data-state";
import Panel from "@/app/ui/panel";
import StatBadge from "@/app/ui/stat-badge";
import TarkovImage from "@/app/ui/tarkov-image";
import { TRADER_LEVELS } from "@/app/optimiser-v2/constants";
import BuildTree from "@/app/optimiser-v2/_components/build-tree";
import WeaponCardImage from "@/app/optimiser-v2/_components/weapon-card-image";

type BuildSurfaceProps = {
  weaponId?: string;
  weaponName?: string;
  weaponPresetId?: string;
  traderLevels: TraderLevels;
};

function SummaryRow({
  build,
  traderLevels,
  weaponName,
  weaponPresetId,
  weaponId,
}: {
  build: WeaponTree;
  traderLevels: TraderLevels;
  weaponName?: string;
  weaponPresetId?: string;
  weaponId?: string;
}) {
  return (
    <Panel className="space-y-5">
      <div className="rounded-xl border border-[var(--tarkov-border-strong)] bg-[var(--tarkov-bg-800)]/85 p-4 shadow-inner shadow-black/40">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {weaponPresetId ? (
              <WeaponCardImage
                presetId={weaponPresetId}
                weaponId={weaponId || build.id}
                name={weaponName || build.name}
                className="w-40"
              />
            ) : (
              <TarkovImage
                itemId={weaponId || build.id}
                alt={build.name || "Weapon"}
                width={96}
                height={96}
              />
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--tarkov-text-muted)]">
                Optimal Build
              </p>
              <h2 className="text-2xl font-semibold text-white">
                {weaponName || build.name}
              </h2>
              <p className="text-sm text-[var(--tarkov-text-muted)]">
                Focus: {build.evaluation_type}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatBadge
              label="Ergonomics"
              value={build.ergonomics_sum.toFixed(1)}
              tone="positive"
            />
            <StatBadge
              label="Recoil"
              value={build.recoil_sum.toFixed(1)}
              tone="negative"
            />
            <StatBadge
              label="Status"
              value={build.status}
              tone={build.status === "Completed" ? "positive" : "warning"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRADER_LEVELS.map((level) => (
          <div
            key={level.param}
            className="rounded-lg border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/60 px-3 py-2 text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]"
          >
            <span className="text-white">{level.label}</span>{" "}
            {traderLevels[level.param]}
          </div>
        ))}
      </div>
    </Panel>
  );
}

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
        <SummaryRow
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
