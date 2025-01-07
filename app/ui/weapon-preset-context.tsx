"use client";

import { createContext, useEffect, useState } from "react";
import { WeaponPreset } from "@/app/lib/definitions";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";

type WeaponPresetContext = {
  status: string;
  presets: WeaponPreset[];
  presetsById: Record<string, WeaponPreset>;
  presetsByCategory: Record<string, WeaponPreset[]>;
  errorMsg: string;
};

export const WeaponPresetContext = createContext<WeaponPresetContext>({
  status: "pending",
  presets: [],
  presetsById: {},
  presetsByCategory: {},
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
  const [] = useState<string>();
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

        setWeapons([...presets]);
        setWeaponsById({ ...byId });
        const byCategory = groupPresetsByCategory(presets);
        setWeaponsByCategory({ ...byCategory });

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
    presets: weapons,
    presetsById: weaponsById,
    errorMsg,
    presetsByCategory: weaponsByCategory,
  };
};

export default function WeaponPresetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, presets, presetsById, errorMsg, presetsByCategory } =
    useWeaponPresets();

  return (
    <WeaponPresetContext.Provider
      value={{
        status,
        presets: presets,
        presetsById: presetsById,
        errorMsg,
        presetsByCategory: presetsByCategory,
      }}
    >
      {children}
    </WeaponPresetContext.Provider>
  );
}
