const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameinput = "#username";
    this.emailinput = "#email";
    this.passwordinput = "#password";
    this.loginButton = "#submit";
    this.successMessage = ".post-title";
    this.usernameEmptyField = "#error";
    this.passwordEmptyField = "#error";
    this.submitButton = "#submit";
  }
  async login(userName, password) {
    await this.page.locator(this.usernameinput).fill(userName);
    await this.page.locator(this.passwordinput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    const verifyLoginSucess = await this.page.locator(this.successMessage);
    await expect(verifyLoginSucess).toHaveText(/Logged In Successfully/);
  }
  async verifyUsernameEmptyField() {
    const verifyEmptyUsername = await this.page
      .locator(this.usernameEmptyField)
      .textContent();
    await expect(verifyEmptyUsername).toContain("Your username is invalid!");
  }
  async verifyPasswordEmptyField() {
    const verifyEmptyPassword = await this.page
      .locator(this.passwordEmptyField)
      .textContent();
    await expect(verifyEmptyPassword).toContain("Your password is invalid!");
  }
  async loginContact(email, password) {
    await this.page.locator(this.emailinput).fill(email);
    await this.page.locator(this.passwordinput).fill(password);
    await this.page.locator(this.submitButton).click();
  }
  async contactEdit() {
    await this.page.locator(this.editCreated).click();
    await this.page.locator(this.editCreated).click();
    await this.page.locator(this.firstName).fill("sujal");
    await this.page.locator(this.lastName).fill("amatya");
    await this.page.locator(this.submit).click();
  }
};
