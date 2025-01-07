"use client";

import { createContext, useEffect, useState } from "react";
import { WeaponPreset } from "@/app/lib/definitions";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";

type WeaponPresetContext = {
  status: string;
  weapons: WeaponPreset[];
  weaponsById: Record<string, WeaponPreset>;
  weaponsByCategory: Record<string, WeaponPreset[]>;
  errorMsg: string;
};

export const WeaponPresetContext = createContext<WeaponPresetContext>({
  status: "pending",
  weapons: [],
  weaponsById: {},
  weaponsByCategory: {},
  errorMsg: "",
});

function groupPresetsByCategory(presets: WeaponPreset[]) {
  const grouped: Record<string, WeaponPreset[]> = {};
  presets.forEach((preset) => {
    const category = preset.properties.baseItem.bsgCategory.name;
    if (preset.properties.default) {
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(preset);
    }
  });

  return grouped;
}

const useWeaponPresets = (): WeaponPresetContext => {
  const [weapons, setWeapons] = useState<WeaponPreset[]>([]);
  const [weaponsById, setWeaponsById] = useState<Record<string, WeaponPreset>>(
    {},
  );
  const [weaponsByCategory, setWeaponsByCategory] = useState<
    Record<string, WeaponPreset[]>
  >({});
  const [status, setStatus] = useState<"pending" | "complete" | "error">(
    "pending",
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    async function getWeaponPresets() {
      try {
        const presets = await getWeaponDefaultPresets();

        const byId = presets.reduce<Record<string, WeaponPreset>>(
          (acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          },
          {},
        );

        setWeapons(presets);
        setWeaponsById(byId);
        const byCategory = groupPresetsByCategory(presets);
        setWeaponsByCategory(byCategory);

        setStatus("complete");
      } catch (err) {
        setStatus("error");
        if (err instanceof Error) {
          setErrorMsg(err.toString());
        } else {
          setErrorMsg("An unknown error occurred");
        }
      }
    }

    console.log("fetching weapons");
    setStatus("pending");
    getWeaponPresets();
  }, []);

  return {
    status,
    weapons,
    weaponsById,
    errorMsg,
    weaponsByCategory,
  };
};

export default function WeaponPresetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, weapons, weaponsById, errorMsg, weaponsByCategory } =
    useWeaponPresets();

  return (
    <WeaponPresetContext.Provider
      value={{ status, weapons, weaponsById, errorMsg, weaponsByCategory }}
    >
      {children}
    </WeaponPresetContext.Provider>
  );
}
