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
  Jaeger = "jaeger_level",
  Mechanic = "mechanic_level",
  Skier = "skier_level",
}

export type WeaponPreset = {
  name: string;
  gridImageLink: string;
  baseImageLink: string;
  id: string;
  properties: {
    default: boolean;
    baseItem: {
      id: string;
      name: string;
      bsgCategory: {
        name: string;
      };
    };
  };
};

export type GroupedWeaponPresets = Record<string, WeaponPreset[]>;

export type WeaponTree = Item;

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
  status: string;
}

export enum BuildType {
  Ergonomics = "ergonomics",
  Recoil = "recoil",
}
