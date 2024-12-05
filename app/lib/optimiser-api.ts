import { TraderLevels, WeaponTree } from "@/app/lib/definitions";

export async function getOptimumBuild(
  itemId: string,
  traderLevels: TraderLevels,
): Promise<WeaponTree> {
  const params = new URLSearchParams();
  Object.keys(traderLevels).forEach((key) =>
    params.set(key, traderLevels[key]),
  );

  params.set("build_type", "recoil");

  const url = `${process.env.OPTIMISER_API_URL}/api/items/weapons/${itemId}/calculate?${params.toString()}`;
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
