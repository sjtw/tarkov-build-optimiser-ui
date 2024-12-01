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
          and build_type = 'recoil'
          and prapor_level = '${parseInt(traderLevels.prapor_level)}'
          and mechanic_level = '${parseInt(traderLevels.mechanic_level)}'
          and peacekeeper_level = '${parseInt(traderLevels.peacekeeper_level)}'
          and jaeger_level = '${parseInt(traderLevels.jaeger_level)}'
          and skier_level = '${parseInt(traderLevels.skier_level)}'
    `;

  const builds = await db.query<WeaponTree>(query);
  return builds.rows[0];
}
