"use client";

import React from "react";
import { GroupedWeaponPresets } from "@/app/lib/definitions";
import Card from "@/app/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WeaponImage from "@/app/ui/weapon-image";

interface Props {
  presets: GroupedWeaponPresets;
  selectedId?: string;
}

function WeaponBrowser({ presets, selectedId }: Props) {
  const searchParams = useSearchParams();

  const category = searchParams.get("weapon_category") || "";
  const weapons = (category !== "" && presets[category]) || null;

  return (
    <div className="p-4">
      {weapons &&
        weapons.map((w) => (
          <Link
            key={`weapon-img-${w.id}`}
            href={`/optimiser/weapons/${w.properties.baseItem.id}?${searchParams.toString()}`}
          >
            <Card
              className={
                w.properties.baseItem.id === selectedId
                  ? "bg-teal-800"
                  : undefined
              }
              title={w.name}
            >
              <WeaponImage id={w.id} name={w.name} />
            </Card>
          </Link>
        ))}
    </div>
  );
}

export default WeaponBrowser;
