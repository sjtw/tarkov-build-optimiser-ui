import { test, expect } from "@playwright/test";
import { mockWeaponPresetsResponse } from "../fixtures/mock-weapon-presets";

test.describe("Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("https://api.tarkov.dev/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockWeaponPresetsResponse),
      });
    });
  });
  test("should load the home page successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Tarkov Build Optimiser/);

    await expect(
      page.getByRole("heading", { name: "Build Visualiser" }),
    ).toBeVisible();
  });

  test("should display trader levels section", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Trader Levels" }),
    ).toBeVisible();

    await expect(page.getByText("Prapor")).toBeVisible();
    await expect(page.getByText("Peacekeeper")).toBeVisible();
    await expect(page.getByText("Mechanic")).toBeVisible();
    await expect(page.getByText("Skier")).toBeVisible();
    await expect(page.getByText("Jaeger")).toBeVisible();
  });

  test("should display weapon catalogue section", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Weapon Catalogue" }),
    ).toBeVisible();

    await expect(
      page.getByRole("combobox", { name: "Select weapon category" }),
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: "Search weapons by name" }),
    ).toBeVisible();
  });

  test("should show trader images", async ({ page }) => {
    await page.goto("/");

    const praporImage = page.getByAltText("Prapor");
    await expect(praporImage).toBeVisible();

    await expect(praporImage).toHaveJSProperty("complete", true);
    const naturalWidth = await praporImage.evaluate(
      (img: HTMLImageElement) => img.naturalWidth,
    );
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test("should allow changing trader levels", async ({ page }) => {
    await page.goto("/");

    const praporLevel1 = page.getByRole("button", {
      name: "Set Prapor to level 1",
    });
    await praporLevel1.click();

    await expect(praporLevel1).toHaveAttribute("aria-pressed", "true");

    expect(page.url()).toContain("prapor_level=1");
  });

  test("should filter weapons by category", async ({ page }) => {
    await page.goto("/");

    const categorySelect = page.getByRole("combobox", {
      name: "Select weapon category",
    });
    await categorySelect.selectOption("Assault rifle");

    await page.waitForURL(/weapon_category=Assault\+rifle/);

    expect(page.url()).toContain("weapon_category=Assault+rifle");
  });

  test("should search for weapons", async ({ page }) => {
    await page.goto("/?weapon_category=Assault+carbine");

    await page.waitForSelector('button[aria-label*="Select"]');

    const initialCount = await page
      .locator('button[aria-label*="Select"]')
      .count();

    const searchInput = page.getByRole("textbox", {
      name: "Search weapons by name",
    });
    await searchInput.fill("AS VAL");

    await page.waitForTimeout(500);

    const filteredCount = await page
      .locator('button[aria-label*="Select"]')
      .count();
    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);

    await expect(
      page.getByRole("button", { name: /AS VAL/i }).first(),
    ).toBeVisible();
  });

  test("should display reset filters button", async ({ page }) => {
    await page.goto("/?weapon_category=Assault+rifle&prapor_level=2");

    const initialUrl = page.url();

    const resetButton = page.getByRole("button", { name: "Reset Filters" });
    await expect(resetButton).toBeVisible();

    await resetButton.click();

    await page.waitForFunction(
      (oldUrl) => window.location.href !== oldUrl,
      initialUrl,
    );

    expect(page.url()).not.toBe(initialUrl);

    expect(page.url()).toContain("prapor_level=4");
    expect(page.url()).toContain("peacekeeper_level=4");
    expect(page.url()).toContain("mechanic_level=4");

    expect(page.url()).not.toContain("weapon_id");
  });
});

