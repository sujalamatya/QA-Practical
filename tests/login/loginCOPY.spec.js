const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
import { LoginPage } from "../../pageObjects/login.po.js";

test.beforeEach(async ({ page }) => {
  // await page.goto('/');
  await page.goto("https://practicetestautomation.com/practice-test-login/");
});

test("Valid username and Password Login test", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(testData.validUser.userName, testData.validUser.password);
  await login.verifyValidLogin();
});
test("Invalid username and valid Password Login test", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(testData.invalidUser.userName, testData.validUser.password);
  await login.verifyUsernameEmptyField();
});
test("valid username and Password Login test", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(testData.validUser.userName, testData.invalidUser.password);
  await login.verifyPasswordEmptyField();
});
