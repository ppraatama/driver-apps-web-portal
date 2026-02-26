import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { config } from '../utils/config.js';
import { users } from '../data/users.js';

export default async function globalLogin() {

  console.log("Performing login...");
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const user = users[0];

  await loginPage.navigate(config.baseUrl);
  await loginPage.login(user.username, user.password);
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'auth/storageState.json' });
  await browser.close();
  console.log("Storage state saved");

}
