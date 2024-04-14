import { test, expect } from "@playwright/test";

test("hero on the note", async ({ page }) => {
  // Should render the hero
  await page.goto("/notes/post/astro");
  await expect(page.locator("#hero > div:nth-child(2)")).toBeVisible();

  // - Should render the badges with the link to the right category
  await expect(
    page.getByRole("link", { name: "front", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "front", exact: true }).click();
  await expect(page.getByRole("heading", { name: "front" })).toBeVisible();
});
