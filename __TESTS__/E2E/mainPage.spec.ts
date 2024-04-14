import { test, expect } from "@playwright/test";

test("test render all page", async ({ page }) => {
  //  Should render the page
  await page.goto("/");

  //  Should render the Hero
  await expect(
    page.getByRole("heading", { name: "DEV ROADMAP" }),
  ).toBeVisible();

  // Should render the image on the about me section
  await expect(
    page.getByRole("img", { name: "Profile picture" }),
  ).toBeVisible();

  // Should render the Why section
  await expect(page.getByRole("heading", { name: "INICIATIVA" })).toBeVisible();

  // Should render the Recent section
  await expect(page.getByRole("heading", { name: "RECIENTES" })).toBeVisible();

  // Should render at least one card with content
  await expect(
    page.getByRole("link", { name: "Cypress icon 10/1/2024" }),
  ).toBeVisible();

  // Should render the Categories section
  await expect(page.getByRole("heading", { name: "CATEGORIAS" })).toBeVisible();

  // Should render the category for all the notes
  await expect(
    page.getByRole("link", { name: "Todo", exact: true }),
  ).toBeVisible();

  // Should render the Footer content with the button to copy
  await page
    .locator("div")
    .filter({ hasText: "tomasleandrolugo@gmail.com" })
    .nth(3)
    .click();
  await expect(page.locator(".sticky > svg").first()).toBeVisible();
});
