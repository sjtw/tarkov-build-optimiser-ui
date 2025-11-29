import { WeaponPreset } from "@/app/lib/definitions";

const API_URL = "https://api.tarkov.dev/graphql";

type UnknownObject = { [key: string]: unknown };

type TarkovDevResponse<T extends UnknownObject> = {
  data: T;
};

async function execute<T extends UnknownObject>(query: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  if (res.status === 200) {
    const body = (await res.json()) as TarkovDevResponse<T>;

    return body.data;
  } else {
    throw new Error(
      `Tarkov.dev responded with unexpected status - ${res.status}`,
    );
  }
}

export type ItemImageRef = {
  id: string;
  baseImageLink: string;
};

export type TraderImageRef = {
  name: string;
  imageLink: string;
};

type ImagesResponse = {
  items: ItemImageRef[];
  traders: TraderImageRef[];
};

export async function getAllImages(): Promise<ImagesResponse> {
  return await execute<ImagesResponse>(`{
    items {
      id
      baseImageLink
    }
    traders {
      name
      imageLink
    }
  }`);
}

type PresetsResponse = {
  items: WeaponPreset[];
};

export async function getWeaponDefaultPresets(): Promise<WeaponPreset[]> {
  const presetsResponse = await execute<PresetsResponse>(`
    {
      items(type: preset, categoryNames: Weapon) {
        id
        name
        gridImageLink
        baseImageLink
        properties {
          ... on ItemPropertiesPreset {
            default
            baseItem {
              id
              name
              bsgCategory {
                name
              }
            }
          }
        }
      }
    }`);

    return presetsResponse.items;
}
