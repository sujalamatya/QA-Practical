const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // await page.goto("https://facebook.com/");
});

test("has title", async ({ page }) => {
  // await page.goto("https://facebook.com/");
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Facebook/);
  await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
});

test("click login button", async ({ page }) => {
  await page.goto("https://facebook.com/");
  await page.getByTestId("royal_login_button").click();
  // Expect a title "to contain" a substring.
});

test.describe("valid login tests", () => {
  test("login", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.validUser.username");
    await page.locator("#password").fill("testData.validUser.password");
    await page.locator("#submit").click();

    await expect(page.locator(".post-title")).toHaveText(
      /Logged In Successfully/
    );
  });
});
test.describe("invalid login tests", () => {
  test("invalid username", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.invalidUsername.username");
    await page.locator("#password").fill("testData.validUser.password");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });
  test("invalid password", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.validUser.username");
    await page.locator("#password").fill("testData.invalidPassword.password");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });
  test("invalid username and password", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.invalidUsername.username");
    await page.locator("#password").fill("testData.invalidPassword.password");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });
  test("empty username", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.emptyUsername.username");
    await page.locator("#password").fill("testData.validUser.password");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });
  test("empty password", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator("#username").fill("testData.validUser.username");
    await page.locator("#password").fill("testData.emptyUsername.password");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });
});
