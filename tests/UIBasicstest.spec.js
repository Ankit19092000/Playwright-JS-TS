const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

test.use({ headless: false });

test("First Test", async ({ page }) => {

  const username = page.locator("input#username")
  const password = page.locator("[type='password']")
  const signInButton = page.locator("#signInBtn")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  expect(await page.title()).toContain("LoginPage Practise | Rahul Shetty Academy");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInButton.click();
  console.log(await page.locator("[style*='block']").textContent());
  expect(await page.locator("[style*='block']").textContent()).toContain("Incorrect username/password.");
});

