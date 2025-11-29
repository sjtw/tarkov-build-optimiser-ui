import { TraderLevels, WeaponTree } from "@/app/lib/definitions";

const OPTIMISER_BASE_URL =
  process.env.NEXT_PUBLIC_OPTIMISER_API_URL ||
  process.env.OPTIMISER_API_URL ||
  "http://localhost:8080";

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
