"use client";

import React, { useState } from "react";
import CategorySelection from "@/app/ui/category-selection";
import { GroupedWeaponPresets, TraderLevelNames } from "@/app/lib/definitions";
import Card from "@/app/ui/card";
import Link from "next/link";
import TraderLevelSelection from "@/app/ui/trader-level-selection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WeaponImage from "@/app/ui/weapon-image";

interface Props {
  presets: GroupedWeaponPresets;
}

function WeaponBrowser({ presets }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useState<string | null>(null);

  const categories = Object.keys(presets).map((k) => ({
    value: k,
    name: k,
  }));

  const weapons = (category && presets[category]) || null;

  const onLevelChange = (trader: string, level: string) => {
    const params = new URLSearchParams(searchParams);
    if (trader && level) {
      params.set(trader, level);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const traderLevels = {
    [TraderLevelNames.Prapor]: searchParams.get(TraderLevelNames.Prapor) || "",
    [TraderLevelNames.Peacekeeper]:
      searchParams.get(TraderLevelNames.Peacekeeper) || "",
    [TraderLevelNames.Mechanic]:
      searchParams.get(TraderLevelNames.Mechanic) || "",
    [TraderLevelNames.Jager]: searchParams.get(TraderLevelNames.Jager) || "",
    [TraderLevelNames.Skier]: searchParams.get(TraderLevelNames.Skier) || "",
  };

  return (
    <div>
      <div className="w-[250px] bg-teal-800 p-2 m-2">
        <TraderLevelSelection onChange={onLevelChange} values={traderLevels} />
        {}
        <CategorySelection setCategory={setCategory} categories={categories} />
      </div>
      <div className="p-4 flex flex-wrap">
        {weapons &&
          weapons.map((w) => (
            <Link
              key={`weapon-img-${w.id}`}
              href={`/optimiser/weapons/${w.properties.baseItem.id}?${searchParams.toString()}`}
            >
              <Card
                className="w-72 flex flex-col items-center h-32 text-sm"
                title={w.name}
              >
                <WeaponImage url={w.baseImageLink} />
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default WeaponBrowser;
