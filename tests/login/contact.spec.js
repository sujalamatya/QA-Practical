const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
import { LoginPage } from "../../pageObjects/login.po.js";
const { authenticateUser1 } = require("../../utils/helper.spec");
const { createEntity } = require("../../utils/helper.spec");

let interceptId;

test.beforeEach(async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.locator("#email").fill(testData.contact.Cemail);
  await page.locator("#password").fill(testData.contact.password);
  await page.locator("#submit").click();
});
test.describe("add edit for contact", () => {
  test("add contact", async ({ page }) => {
    await page.locator("#add-contact").click();
    await page.locator("#firstName").fill(testData.contact.firstname);
    await page.locator("#lastName").fill(testData.contact.lastname);
    await page.locator("#submit").click();
  });
  test("edit contacts", async ({ page }) => {
    await page.locator("#add-contact").click();
    await page.waitForSelector("#firstName");

    await page.locator("#firstName").fill(testData.contact.firstname);
    await page.locator("#lastName").fill(testData.contact.lastname);
    await page.locator("#birthdate").fill(testData.contact.birthdate);
    await page.locator("#email").fill(testData.contact.email);
    await page.locator("#phone").fill(testData.contact.phone);
    await page.locator("#street1").fill(testData.contact.street1);
    await page.locator("#street2").fill(testData.contact.street2);
    await page.locator("#city").fill(testData.contact.city);
    await page.locator("#stateProvince").fill(testData.contact.stateprovince);
    await page.locator("#postalCode").fill(testData.contact.postalcode);
    await page.locator("#country").fill(testData.contact.country);

    await page.locator("#submit").click();

    await page.waitForSelector("text=Contact List");

    // await page.waitForSelector('.contactTableBodyRow');

    const contactRow = await page
      .locator('.contactTableBodyRow:has-text("Sujal Amatya")')
      .first();
    await contactRow.click();

    // await page.waitForSelector('text=Contact Details');

    await page.locator("#edit-contact").click();

    await page.waitForSelector("text=Edit Contact");
    await page.locator("#firstName").fill(testData.editContact.firstname);
    await page.locator("#lastName").fill(testData.editContact.lastname);
    await page.locator("#birthdate").fill(testData.editContact.birthdate);
    await page.locator("#email").fill(testData.editContact.email);
    await page.locator("#phone").fill(testData.editContact.phone);
    await page.locator("#street1").fill(testData.editContact.street1);
    await page.locator("#street2").fill(testData.editContact.street2);
    await page.locator("#city").fill(testData.editContact.city);
    await page
      .locator("#stateProvince")
      .fill(testData.editContact.stateprovince);
    await page.locator("#postalCode").fill(testData.editContact.postalcode);
    await page.locator("#country").fill(testData.editContact.country);

    await page.locator("#submit").click();
    await page.waitForSelector("text=Contact Details");

    await page.pause();
  });

  test("contacts edit using helper class", async ({
    context,
    page,
    request,
  }) => {
    const contact = new LoginPage(page);
    const Data = { firstname: "Rojal", lastname: "Lal" };
    const accessToken = await authenticateUser1({ request });
    const entityId = await createEntity(Data, accessToken, "/contacts", {
      request,
    });
    await intercept(
      "https://thinking-tester-contact-list.herokuapp.com/contacts/**",
      { context, page }
    );
    page.reload();
    await contact.contactEdit();

    await page.waitForTimeout(5000);
    await contact.deleteEntity(accessToken, `/contects/${interceptId}`, {
      request,
    });
  });
});
async function intercept(module, { context, page }) {
  await context.route(module, async (route) => {
    await response.continue();
    const response = await page.waitForResponse(module);
    page.waitForTimeout(5000);
    const responseBody = await response.json();
    interceptId = responseBody._id;
  });
}
test.only("contact delete test", async ({ context, page, request }) => {
  await intercept("**/contacts", { context, page });
  const contact = new LoginPage(page);
  const Data = { firstName: "Rojal", lastName: "Lal" };
  const accessToken = await authenticateUser1({ request });
  const entityId = await createEntity(Data, accessToken, "/contacts", {
    request,
  });
  page.reload();
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
  });
  await contact.contactDelete();
  await page.waitForTimeout(3000);
});
test.afterEach(async ({ page }) => {
  await page.close();
});
