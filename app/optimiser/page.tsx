import React, { Suspense } from "react";
import { Metadata } from "next";
import Filters from "@/app/ui/filters/filters";
import WeaponPresetProvider from "@/app/ui/weapon-preset-context";

export const metadata: Metadata = {
  title: "Optimiser",
};

function Page() {
  return (
    <WeaponPresetProvider>
      <div className="flex pb-0 h-full">
        <Suspense fallback={"Loading weapons..."}>
          <Filters />
        </Suspense>
        <div className="flex-grow overflow-y-scroll p-4">
          <p className="text-center w-full justify-center">
            Weapon build will be displayed once a weapon & trader levels are
            selected
          </p>
        </div>
      </div>
    </WeaponPresetProvider>
  );
}

export default Page;
