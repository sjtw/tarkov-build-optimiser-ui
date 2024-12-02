import db from "@/db";
import { TraderLevels, WeaponSummary, WeaponTree } from "@/app/lib/definitions";

export async function getWeaponSummaries() {
  const weapons = await db.query<WeaponSummary>(`
        select item_id, name
        from weapons
    `);

  return weapons.rows;
}

export async function getOptimumBuild(id: string, traderLevels: TraderLevels) {
  const query = `
        select *
        from optimum_builds
        where is_subtree is false
          and build_type = $1
          and prapor_level = $2
          and mechanic_level = $3
          and peacekeeper_level = $4
          and jaeger_level = $5
          and skier_level = $6
          and item_id = $7
    `;

  const values = [
    "recoil",
    parseInt(traderLevels.prapor_level),
    parseInt(traderLevels.mechanic_level),
    parseInt(traderLevels.peacekeeper_level),
    parseInt(traderLevels.jaeger_level),
    parseInt(traderLevels.skier_level),
    id,
  ];

  const builds = await db.query<WeaponTree>(query, values);
  return builds.rows[0];
}
