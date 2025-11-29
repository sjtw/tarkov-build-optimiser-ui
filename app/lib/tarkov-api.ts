import { WeaponPreset } from "@/app/lib/definitions";

const API_URL = "https://api.tarkov.dev/graphql";

type UnknownObject = { [key: string]: unknown };

type TarkovDevItemsResponse<T extends UnknownObject> = {
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

type ImageRef = {
  id: string;
  baseImageLink: string;
};

export async function getAllImages(): Promise<
  { items: ImageRef[], traders: ImageRef[] }
> {
  return await execute<{ id: string; baseImageLink: string }>(`{
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

export async function getWeaponDefaultPresets(): Promise<WeaponPreset[]> {
  const presetsResponse = await execute<WeaponPreset>(`
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
