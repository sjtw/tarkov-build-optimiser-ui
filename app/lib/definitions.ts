export type TraderLevels = {
  [key: string]: string;
  prapor_level: string;
  peacekeeper_level: string;
  jaeger_level: string;
  mechanic_level: string;
  skier_level: string;
};

export enum TraderLevelNames {
  Prapor = "prapor_level",
  Peacekeeper = "peacekeeper_level",
  Jager = "jaeger_level",
  Mechanic = "mechanic_level",
  Skier = "skier_level",
}

// export type OptimumBuild = {
//   item_id: number;
//   build: string;
//   build_type: string;
//   is_subtree: boolean;
//   recoil_sum: number;
//   ergonomics_sum: number;
//   name: string;
//   jaeger_level: number;
//   prapor_level: number;
//   peacekeeper_level: number;
//   mechanic_level: number;
//   skier_level: number;
// };

export type ItemImageDetails = {
  id: string;
  image: string;
};

export type WeaponSummary = {
  item_id: string;
  name: string;
};

export type WeaponPreset = {
  name: string;
  gridImageLink: string;
  baseImageLink: string;
  id: string;
  properties: {
    default: boolean;
    baseItem: {
      id: string;
      bsgCategory: {
        name: string;
      };
    };
  };
};

export type GroupedWeaponPresets = Record<string, WeaponPreset[]>;

export interface WeaponTree {
  item_id: string;
  build: Item;
  build_type: BuildType;
  is_subtree: boolean;
  recoil_sum: number;
  ergonomics_sum: number;
  name: string;
  jaeger_level: number;
  prapor_level: number;
  peacekeeper_level: number;
  mechanic_level: number;
  skier_level: number;
}

export interface Slot {
  id: string;
  item: Item | null;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  slots: Slot[];
  is_subtree: boolean;
  recoil_sum: number;
  ergonomics_sum: number;
  evaluation_type: BuildType;
  recoil_modifier: number;
  ergonomics_modifier: number;
}

export enum BuildType {
  Ergonomics = "ergonomics",
  Recoil = "recoil",
}
