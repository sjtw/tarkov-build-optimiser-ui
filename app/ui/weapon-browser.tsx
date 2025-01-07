"use client";

import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import WeaponCard from "@/app/ui/filters/weapon-card";
import { WeaponPresetContext } from "@/app/ui/weapon-preset-context";

interface Props {
  selectedId?: string;
}

function WeaponBrowser({ selectedId }: Props) {
  const searchParams = useSearchParams();

  const category = searchParams.get("weapon_category") || "";
  const { presetsByCategory } = useContext(WeaponPresetContext);

  const categoryPresets = presetsByCategory[category];

  return (
    <div className="p-4">
      {categoryPresets?.map((w) => {
        const params = new URLSearchParams(searchParams);
        params.set("name", w.properties.baseItem.name);

        return (
          <WeaponCard
            id={w.id}
            name={w.name}
            selected={selectedId === w.id}
            key={`weapon-img-${w.id}`}
            href={`/optimiser/weapons/${w.properties.baseItem.id}?${params.toString()}`}
          />
        );
      })}
    </div>
  );
}

export default WeaponBrowser;
