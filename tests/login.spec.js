import { test, expect } from '../fixtures/testFixtures.js'
import { users, invalidUsername, invalidPassword } from '../data/users.js';
import { config } from '../utils/config.js';
import { allure } from 'allure-playwright';

test.describe('Login Driver Apps Portal', () => {

  test('Login valid user', async ({ loginPage, page }) => {

    let apiResponse;
    let apiResponseBody;

    await test.step('Navigate to login page', async () => {

      await loginPage.navigate(config.baseUrl);

    });

    await test.step('Login with valid credentials', async () => {

      // wait for login API response
      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/token/auth') &&
        response.request().method() === 'POST'
      );

      await loginPage.login(
        users[0].username,
        users[0].password
      );

      // capture response
      apiResponse = await responsePromise;

      apiResponseBody = await apiResponse.text();

      // attach to Allure
      await allure.attachment(
        `LOGIN API Response (${apiResponse.status()})`,
        apiResponseBody,
        'application/json'
      );

    });

    await test.step('Validate Login API Response', async () => {

      const json = JSON.parse(apiResponseBody);

      expect(apiResponse.status()).toBe(200);

      expect(json).toHaveProperty('access_token');

      expect(json).toHaveProperty('id_token');

      expect(json).toHaveProperty('expires_in');

      expect(json.access_token).toBeTruthy();

    });

    await test.step('Verify successful login', async () => {

      await expect(page).toHaveURL(/bluebird.id/);

    });

  });

  test('Login invalid username', async ({ loginPage }) => {

    await test.step('Navigate to login page', async () => {

      await loginPage.navigate(config.baseUrl);

    });

    await test.step('Login with invalid username', async () => {

      await loginPage.login(
        invalidUsername.username,
        users[0].password
      );

    });

    await test.step('Verify error message', async () => {

      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage)
        .toContainText('Invalid Username and Password');

    });

  });

  test('Login invalid password', async ({ loginPage }) => {

    await test.step('Navigate to login page', async () => {

      await loginPage.navigate(config.baseUrl);

    });

    await test.step('Login with invalid password', async () => {

      await loginPage.login(
        users[0].username,
        invalidPassword.password
      );

    });

    await test.step('Verify error message', async () => {

      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage)
        .toContainText('Invalid Username and Password');

    });

  });

});