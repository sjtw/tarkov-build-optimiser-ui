import { WeaponPreset } from "@/app/lib/definitions";

const API_URL = "https://api.tarkov.dev/graphql";

type UnknownObject = { [key: string]: unknown };

type TarkovDevResponse<T extends UnknownObject> = {
  data: T;
};

/**
 * Executes a GraphQL query against the Tarkov.dev API.
 *
 * @template T - The expected shape of the response data
 * @param query - GraphQL query string to execute
 * @returns Promise resolving to the response data
 * @throws Error if the API responds with a non-200 status code
 */
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

/**
 * Fetches all item and trader image references from the Tarkov.dev API.
 * Used for downloading and caching images locally.
 *
 * @returns Promise resolving to arrays of item and trader image references
 */
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

/**
 * Fetches all default weapon presets from the Tarkov.dev API.
 * Default presets are the base weapon configurations provided by the game.
 *
 * @returns Promise resolving to an array of weapon presets with their base items and categories
 */
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
