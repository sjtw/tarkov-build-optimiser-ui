import { cache } from "react";
import { WeaponPreset } from "@/app/lib/definitions";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";

/**
 * Groups weapon presets by their category name.
 * Only includes default presets.
 *
 * @param presets - Array of weapon presets to group
 * @returns Record mapping category names to arrays of presets
 */
function groupPresetsByCategory(
  presets: WeaponPreset[],
): Record<string, WeaponPreset[]> {
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

/**
 * Creates a record mapping preset IDs to preset objects.
 *
 * @param presets - Array of weapon presets
 * @returns Record mapping preset IDs to preset objects
 */
function indexPresetsById(
  presets: WeaponPreset[],
): Record<string, WeaponPreset> {
  return presets.reduce<Record<string, WeaponPreset>>((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
}

/**
 * Fetches all weapon presets with React Server Component caching.
 * This function is cached per-request in the React tree.
 *
 * @returns Promise resolving to array of weapon presets
 */
export const getCachedPresets = cache(async (): Promise<WeaponPreset[]> => {
  return await getWeaponDefaultPresets();
});

/**
 * Fetches weapon presets indexed by ID with caching.
 * Uses the cached preset fetching under the hood.
 *
 * @returns Promise resolving to record of presets by ID
 */
export const getPresetsById = cache(
  async (): Promise<Record<string, WeaponPreset>> => {
    const presets = await getCachedPresets();
    return indexPresetsById(presets);
  },
);

/**
 * Fetches weapon presets grouped by category with caching.
 * Only includes default presets.
 * Uses the cached preset fetching under the hood.
 *
 * @returns Promise resolving to record of presets grouped by category
 */
export const getPresetsByCategory = cache(
  async (): Promise<Record<string, WeaponPreset[]>> => {
    const presets = await getCachedPresets();
    return groupPresetsByCategory(presets);
  },
);

/**
 * Extracts and sorts category names from presets.
 *
 * @param presetsByCategory - Record of presets grouped by category
 * @returns Sorted array of category objects with label and value
 */
export function getCategoriesFromPresets(
  presetsByCategory: Record<string, WeaponPreset[]>,
): Array<{ label: string; value: string }> {
  return Object.keys(presetsByCategory)
    .sort()
    .map((key) => ({
      label: key,
      value: key,
    }));
}

