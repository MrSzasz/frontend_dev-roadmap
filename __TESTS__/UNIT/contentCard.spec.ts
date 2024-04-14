import { test, expect } from "@playwright/test";

test("content card", async ({ page }) => {
  // Should render one card
  await page.goto("/notes");
  await expect(
    page.getByRole("link", { name: "Cypress icon 10/1/2024" }),
  ).toBeVisible();

  // - Should go to that particular page on click
  await page.getByRole("link", { name: "Cypress icon 10/1/2024" }).click();
  await expect(page.locator("body")).toContainText("Cypress");
});
