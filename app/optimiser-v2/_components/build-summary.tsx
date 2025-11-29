import React from "react";
import { TraderLevels, WeaponTree } from "@/app/lib/definitions";
import Panel from "@/app/ui/panel";
import StatBadge from "@/app/ui/stat-badge";
import WeaponCardImage from "@/app/optimiser-v2/_components/weapon-card-image";
import TarkovImage from "@/app/ui/tarkov-image";
import { TRADER_LEVELS } from "@/app/optimiser-v2/constants";
import { Surface, Stack, Text } from "@/app/optimiser-v2/_components/ui";

type BuildSummaryProps = {
  build: WeaponTree;
  traderLevels: TraderLevels;
  weaponName?: string;
  weaponPresetId?: string;
  weaponId?: string;
};

export default function BuildSummary({
  build,
  traderLevels,
  weaponName,
  weaponPresetId,
  weaponId,
}: BuildSummaryProps) {
  return (
    <Panel className="space-y-5">
      <Surface variant="inset" className="p-4 shadow-inner shadow-black/40">
        <Stack gap="lg" className="lg:flex-row lg:items-center lg:justify-between">
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
              <Text variant="meta">Optimal Build</Text>
              <h2 className="text-2xl font-semibold text-white">
                {weaponName || build.name}
              </h2>
              <Text variant="subtle">Focus: {build.evaluation_type}</Text>
            </div>
          </div>
          <div className="flex gap-3">
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
        </Stack>
      </Surface>
      <div className="flex flex-wrap gap-2">
        {TRADER_LEVELS.map((level) => (
          <Surface
            key={level.param}
            variant="panel"
            className="px-3 py-2 text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]"
          >
            <span className="text-white">{level.label}</span>{" "}
            {traderLevels[level.param]}
          </Surface>
        ))}
      </div>
    </Panel>
  );
}
