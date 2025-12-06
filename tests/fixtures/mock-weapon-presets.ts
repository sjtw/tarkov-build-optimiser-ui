/**
 * Mock weapon presets data for E2E tests
 * Minimal data structure to satisfy the GraphQL query and test requirements
 */
export const mockWeaponPresetsResponse = {
  data: {
    items: [
      // Assault carbine category - for default category and search tests
      {
        id: "preset-as-val",
        name: "AS VAL 9x39 special assault rifle Default",
        gridImageLink: "https://example.com/as-val.webp",
        baseImageLink: "https://example.com/as-val.webp",
        properties: {
          default: true,
          baseItem: {
            id: "weapon-as-val",
            name: "AS VAL 9x39 special assault rifle",
            bsgCategory: {
              name: "Assault carbine",
            },
          },
        },
      },
      {
        id: "preset-sks",
        name: "TOZ Simonov SKS 7.62x39 carbine Default",
        gridImageLink: "https://example.com/sks.webp",
        baseImageLink: "https://example.com/sks.webp",
        properties: {
          default: true,
          baseItem: {
            id: "weapon-sks",
            name: "TOZ Simonov SKS 7.62x39 carbine",
            bsgCategory: {
              name: "Assault carbine",
            },
          },
        },
      },
      {
        id: "preset-op-sks",
        name: "Molot Arms Simonov OP-SKS 7.62x39 carbine Default",
        gridImageLink: "https://example.com/op-sks.webp",
        baseImageLink: "https://example.com/op-sks.webp",
        properties: {
          default: true,
          baseItem: {
            id: "weapon-op-sks",
            name: "Molot Arms Simonov OP-SKS 7.62x39 carbine",
            bsgCategory: {
              name: "Assault carbine",
            },
          },
        },
      },
      // Assault rifle category - for category filtering test
      {
        id: "preset-ak74",
        name: "Kalashnikov AK-74 5.45x39 assault rifle Default",
        gridImageLink: "https://example.com/ak74.webp",
        baseImageLink: "https://example.com/ak74.webp",
        properties: {
          default: true,
          baseItem: {
            id: "weapon-ak74",
            name: "Kalashnikov AK-74 5.45x39 assault rifle",
            bsgCategory: {
              name: "Assault rifle",
            },
          },
        },
      },
      {
        id: "preset-m4a1",
        name: "Colt M4A1 5.56x45 assault rifle Default",
        gridImageLink: "https://example.com/m4a1.webp",
        baseImageLink: "https://example.com/m4a1.webp",
        properties: {
          default: true,
          baseItem: {
            id: "weapon-m4a1",
            name: "Colt M4A1 5.56x45 assault rifle",
            bsgCategory: {
              name: "Assault rifle",
            },
          },
        },
      },
    ],
  },
};

