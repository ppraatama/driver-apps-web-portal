import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { allure } from 'allure-playwright';

export const test = base.extend({

  page: async ({ page }, use) => {

    // ============================
    // CAPTURE LOGIN API REQUEST
    // ============================
    page.on('request', async (request) => {

      if (request.url().includes('/token/auth')) {

        try {

          const postData = request.postData();

          if (postData) {

            await allure.attachment(
              `LOGIN API Request`,
              postData,
              'application/json'
            );

          }

        } catch (e) {
          console.log("Request attach error:", e);
        }

      }

    });

    // ============================
    // CAPTURE LOGIN API RESPONSE
    // ============================
    page.on('response', async (response) => {

      if (response.url().includes('/token/auth')) {

        try {

          const responseBody = await response.text();

          await allure.attachment(
            `LOGIN API Response (${response.status()})`,
            responseBody,
            'application/json'
          );

        } catch (e) {
          console.log("Response attach error:", e);
        }

      }

    });

    await use(page);

  },

  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await use(loginPage);

  },

  loggedInPage: async ({ page }, use) => {

    await use(page);

  },

});

export const expect = test.expect;
