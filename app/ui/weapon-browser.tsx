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
  const weapons = useContext(WeaponPresetContext);

  const categoryWeapons = weapons.weaponsByCategory[category];

  return (
    <div className="p-4">
      {categoryWeapons?.map((w) => (
        <WeaponCard
          id={w.id}
          name={w.name}
          selected={selectedId === w.id}
          key={`weapon-img-${w.id}`}
          href={`/optimiser/weapons/${w.properties.baseItem.id}?${searchParams.toString()}`}
        />
      ))}
    </div>
  );
}

export default WeaponBrowser;
