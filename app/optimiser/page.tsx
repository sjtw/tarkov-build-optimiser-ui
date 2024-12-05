import React from "react";
import { Metadata } from "next";
import Filters from "@/app/ui/filters/filters";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";

export const metadata: Metadata = {
  title: "Optimiser",
};

async function Page() {
  const presets = await getWeaponDefaultPresets();
  return (
    <div className="flex pb-0 h-full">
      <Filters presets={presets} />
      <div className="flex-grow overflow-y-scroll p-4">
        <p className="text-center w-full justify-center">
          Weapon build will be displayed once a weapon & trader levels are
          selected
        </p>
      </div>
    </div>
  );
}

export default Page;
