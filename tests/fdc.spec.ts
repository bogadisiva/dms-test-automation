import {test,expect} from '../config/fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('create a corporate position',async ({ myActions }) => {
    test.setTimeout(180000); // Set timeout to 3 minutes for this test
    await myActions.navigateToDemandCentral();
});
