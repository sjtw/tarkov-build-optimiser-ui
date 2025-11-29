import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";

export const DEFAULT_TRADER_LEVEL = "4";

export const WEAPON_PARAM = "weapon_id";
export const WEAPON_NAME_PARAM = "weapon_name";
export const CATEGORY_PARAM = "weapon_category";
export const WEAPON_PRESET_PARAM = "weapon_preset_id";

export type TraderLevelConfig = {
  label: string;
  param: TraderLevelNames;
  image: string;
};

export const TRADER_LEVELS: TraderLevelConfig[] = [
  {
    label: "Prapor",
    param: TraderLevelNames.Prapor,
    image: "/images/tarkov/traders/Prapor.webp",
  },
  {
    label: "Peacekeeper",
    param: TraderLevelNames.Peacekeeper,
    image: "/images/tarkov/traders/Peacekeeper.webp",
  },
  {
    label: "Mechanic",
    param: TraderLevelNames.Mechanic,
    image: "/images/tarkov/traders/Mechanic.webp",
  },
  {
    label: "Skier",
    param: TraderLevelNames.Skier,
    image: "/images/tarkov/traders/Skier.webp",
  },
  {
    label: "Jaeger",
    param: TraderLevelNames.Jaeger,
    image: "/images/tarkov/traders/Jaeger.webp",
  },
];

export function deriveTraderLevels(
  searchParams: Record<string, string | string[] | undefined>,
): TraderLevels {
  return {
    [TraderLevelNames.Prapor]:
      (searchParams[TraderLevelNames.Prapor] as string) ||
      DEFAULT_TRADER_LEVEL,
    [TraderLevelNames.Peacekeeper]:
      (searchParams[TraderLevelNames.Peacekeeper] as string) ||
      DEFAULT_TRADER_LEVEL,
    [TraderLevelNames.Mechanic]:
      (searchParams[TraderLevelNames.Mechanic] as string) ||
      DEFAULT_TRADER_LEVEL,
    [TraderLevelNames.Skier]:
      (searchParams[TraderLevelNames.Skier] as string) ||
      DEFAULT_TRADER_LEVEL,
    [TraderLevelNames.Jaeger]:
      (searchParams[TraderLevelNames.Jaeger] as string) ||
      DEFAULT_TRADER_LEVEL,
  };
}
