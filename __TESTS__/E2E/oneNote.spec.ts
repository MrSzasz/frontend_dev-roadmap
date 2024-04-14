import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  const contentName = "Cypress";

  // Should render the page
  await page.goto("/notes/post/cypress");

  // Should render a page with the content in the md
  await expect(
    page.locator("h1").filter({ hasText: contentName }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText("Cypress");

  // Should render one of the headings
  await expect(page.getByRole("link", { name: "- Instalación" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Instalación" }),
  ).toBeVisible();

  // Should render the share links
  await expect(page.getByRole("heading", { name: "Compartir" })).toBeVisible();
  await expect(page.locator(".react-share__ShareButton").first()).toBeVisible();

  // Should show at least one related post card
  await expect(
    page.getByRole("heading", { name: "Posts relacionados" }),
  ).toBeVisible();
});
