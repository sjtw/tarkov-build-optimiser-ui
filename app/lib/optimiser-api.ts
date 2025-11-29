import { TraderLevels, WeaponTree } from "@/app/lib/definitions";

const OPTIMISER_BASE_URL =
  process.env.OPTIMISER_API_URL || "http://localhost:8080";

/**
 * Fetches the optimum weapon build configuration from the optimiser API.
 * The build is optimized for minimum recoil based on the specified trader levels.
 *
 * @param itemId - The unique identifier of the base weapon item
 * @param traderLevels - Object mapping trader names to their levels (1-4)
 * @returns Promise resolving to a weapon tree structure with all mods and stats
 * @throws Error if the API request fails or returns a non-200 status
 *
 * @example
 * ```ts
 * const build = await getOptimumBuild("weapon-id-123", {
 *   prapor_level: "4",
 *   peacekeeper_level: "3",
 *   jaeger_level: "2",
 *   mechanic_level: "4",
 *   skier_level: "3"
 * });
 * ```
 */
export async function getOptimumBuild(
  itemId: string,
  traderLevels: TraderLevels,
): Promise<WeaponTree> {
  const params = new URLSearchParams();
  Object.keys(traderLevels).forEach((key) =>
    params.set(key, traderLevels[key]),
  );

  params.set("build_type", "recoil");

  const url = `${OPTIMISER_BASE_URL}/api/items/weapons/${itemId}/calculate?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
    try {
      return (await res.json()) as WeaponTree;
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to parse response body.`);
    }
  } else {
    throw new Error(`Failed to fetch optimum build - ${res.status}`);
  }
}
