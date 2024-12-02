import React, { Suspense } from "react";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";
import { Metadata } from "next";
import WeaponBrowser from "@/app/ui/weapon-browser";

export const metadata: Metadata = {
  title: "Optimiser",
};

async function Page() {
  const presets = await getWeaponDefaultPresets();

  return (
    <div>
      <Suspense>
        <WeaponBrowser presets={presets} />
      </Suspense>
    </div>
  );
}

export default Page;
