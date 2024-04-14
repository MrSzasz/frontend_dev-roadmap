import { test, expect } from "@playwright/test";

test("render the category", async ({ page }) => {
  // Should render the category component
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Front-end" })).toBeVisible();

  // - Should go to the page of that category on click
  await page.getByRole("link", { name: "Front-end" }).click();
  await expect(page.locator("body")).toContainText("front");
  await expect(page.getByRole("heading", { name: "front" })).toBeVisible();
});
