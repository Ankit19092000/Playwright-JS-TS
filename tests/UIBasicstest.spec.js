import { test, expect } from "@playwright/test";

test.use({ headless: false });

const baseUrl = "https://opensource-demo.orangehrmlive.com/";

async function loginAsAdmin(page) {
  await page.goto(baseUrl);
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[name='password']").fill("admin123");
  await page.locator(".orangehrm-login-button").click();
  await expect(page.locator("a[href*='viewAdminModule'] span")).toContainText("Admin");
}

test("TC001 - Login with valid Admin credentials", async ({ page }) => {
  await loginAsAdmin(page);
});

test("TC002 - Login with invalid password", async ({ page }) => {
  await page.goto(baseUrl);
  await page.locator("input[name='username']").fill("rahulshettyacademy");
  await page.locator("input[name='password']").fill("learning");
  await page.locator(".orangehrm-login-button").click();
  await expect(page.locator(".oxd-alert-content-text")).toContainText("Invalid credentials");
});

test("TC005 - Verify dashboard module navigation", async ({ page }) => {
  await loginAsAdmin(page);
  const menuItems = page.locator(".oxd-main-menu-item--name");
  await menuItems.last().waitFor();

  for (let i = 0; i < 4; i++) {
    const moduleName = ((await menuItems.nth(i).textContent()) ?? "").trim();
    await menuItems.nth(i).click();
    await expect(page.locator(".oxd-topbar-header-breadcrumb-module")).toContainText(moduleName);
  }
});

test("TC007 - Add new employee with mandatory fields only", async ({ page }) => {
  await loginAsAdmin(page);
  await page.locator(".oxd-main-menu-item--name", { hasText: "PIM" }).click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.locator("input[name='firstName']").fill("Hamza");
  await page.locator("input[name='lastName']").fill("Mazhari");
  await page.locator(".oxd-input").last().fill('9876');
  await page.locator("button[type='submit']").click();
  await expect(page.locator("a[href*='viewPersonalDetails']")).toBeVisible();
});

