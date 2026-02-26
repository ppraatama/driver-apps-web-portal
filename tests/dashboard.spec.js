import { test, expect } from '../fixtures/testFixtures.js';


test('dashboard driver app portal', async ({ loggedInPage }) => {

  await loggedInPage.goto('https://stg-driverappsportal.bluebird.id');
  await expect(loggedInPage).toHaveURL(/stg-driverappsportal.bluebird.id/);
});