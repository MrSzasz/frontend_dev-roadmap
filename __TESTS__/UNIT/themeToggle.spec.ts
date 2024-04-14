import { test, expect } from "@playwright/test";

test("change theme", async ({ page }) => {
  // Should render the button to change theme
  await page.goto("/");
  await expect(page.getByRole("switch")).toBeVisible();

  // Should change the theme
  await expect(page.getByTitle(/Light Mode/i)).toBeDefined();
  await page.getByRole("switch").click();
  await expect(page.getByTitle(/Dark Mode/i)).toBeDefined();

  // Should change the theme to first theme on double click
  await expect(page.getByTitle(/Dark Mode/i)).toBeDefined();
  await page.getByRole("switch").click();
  await expect(page.getByTitle(/Light Mode/i)).toBeDefined();
  await page.getByRole("switch").click();
  await expect(page.getByTitle(/Dark Mode/i)).toBeDefined();
});
