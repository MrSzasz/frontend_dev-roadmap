import { test, expect } from "@playwright/test";

test("Render all notes", async ({ page }) => {
  // Should render the page
  await page.goto("/notes");

  // Should render all the notes without "filter"
  await page.getByRole("heading", { name: "Notas" }).click();

  // Should render at least one note
  await expect(
    page.getByRole("link", { name: "Astro icon 15/11/2023 Astro" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cypress icon 10/1/2024" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "EsLint icon 7/12/2023 EsLint" }),
  ).toBeVisible();
});

test("Render a category", async ({ page }) => {
  // Should render the page with the category
  await page.goto("/notes/front");

  // Should render at least one note containing the category "front"
  await expect(
    page.getByRole("link", { name: "Astro icon 15/11/2023 Astro" }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText("front");
});
