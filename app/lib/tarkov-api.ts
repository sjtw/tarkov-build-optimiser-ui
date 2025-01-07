import { WeaponPreset } from "@/app/lib/definitions";

const API_URL = "https://api.tarkov.dev/graphql";

type UnknownObject = { [key: string]: unknown };

type TarkovDevResponse<T extends UnknownObject> = {
  data: {
    items: T[];
  };
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

    return body.data.items;
  } else {
    throw new Error(
      `Tarkov.dev responded with unexpected status - ${res.status}`,
    );
  }
}

export async function getAllImages(): Promise<
  { id: string; baseImageLink: string }[]
> {
  const query = `{
    items {
      id
      baseImageLink
    }
  }`;

  return await execute<{ id: string; baseImageLink: string }>(query);
}

export async function getWeaponDefaultPresets(): Promise<WeaponPreset[]> {
  return await execute<WeaponPreset>(`
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
}
