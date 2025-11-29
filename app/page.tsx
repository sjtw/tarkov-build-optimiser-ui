import React, { Suspense } from "react";
import {
  CATEGORY_PARAM,
  deriveTraderLevels,
  WEAPON_NAME_PARAM,
  WEAPON_PARAM,
  WEAPON_PRESET_PARAM,
} from "@/app/lib/constants";
import {
  getPresetsByCategory,
  getCategoriesFromPresets,
} from "@/app/lib/presets-cache";
import FilterRail from "./components/client/filter-rail";
import BuildSurfaceSkeleton from "./components/server/build-surface-skeleton";
import BuildSurface from "./components/server/build-surface";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const traderLevels = deriveTraderLevels(resolvedParams);
  const weaponId =
    typeof resolvedParams[WEAPON_PARAM] === "string"
      ? resolvedParams[WEAPON_PARAM]
      : undefined;
  const weaponName =
    typeof resolvedParams[WEAPON_NAME_PARAM] === "string"
      ? resolvedParams[WEAPON_NAME_PARAM]
      : undefined;
  const weaponPresetId =
    typeof resolvedParams[WEAPON_PRESET_PARAM] === "string"
      ? resolvedParams[WEAPON_PRESET_PARAM]
      : undefined;
  const category =
    typeof resolvedParams[CATEGORY_PARAM] === "string"
      ? resolvedParams[CATEGORY_PARAM]
      : undefined;

  // Fetch weapon presets server-side
  const presetsByCategory = await getPresetsByCategory();
  const categories = getCategoriesFromPresets(presetsByCategory);

  return (
    <div className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <FilterRail
          category={category}
          weaponId={weaponId}
          presetsByCategory={presetsByCategory}
          categories={categories}
        />
        <main className="flex-1">
          <Suspense
            key={`${weaponId}-${JSON.stringify(traderLevels)}`}
            fallback={<BuildSurfaceSkeleton />}
          >
            <BuildSurface
              weaponId={weaponId}
              weaponName={weaponName}
              weaponPresetId={weaponPresetId}
              traderLevels={traderLevels}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
