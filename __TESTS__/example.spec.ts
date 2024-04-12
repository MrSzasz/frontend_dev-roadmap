import { test, expect } from "@playwright/test";

test("render page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Dev Roadmap");
});
