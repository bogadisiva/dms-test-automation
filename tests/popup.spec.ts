import {test} from '@playwright/test'
test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.getByText('Demo Sites', { exact: true }).filter({visible:true}).hover();   
  await page.waitForLoadState('networkidle', { timeout: 10000 });
    await page.getByText('Practice Automation', { exact: true }).filter({visible:true}).hover();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await page.getByText('Alert and Popup', { exact: true }).filter({visible:true}).click();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
});
test.skip('verify the alert popup',async ({page})=>{
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      });
 await page.getByRole('button', { name: 'Alert Box', exact: true }).filter({visible:true}).click()
 await page.waitForTimeout(4000);
});
test.skip('verify the Confirm Alert Box popup',async ({page})=>{
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.dismiss();
      });
 await page.getByRole('button', { name: 'Confirm Alert Box', exact: true }).filter({visible:true}).click()
 await page.waitForTimeout(4000);
});
test('verify the Prompt Alert Box popup',async ({page})=>{
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept('Vinoth R');
      });
 await page.getByRole('button', { name: 'Prompt Alert Box', exact: true }).filter({visible:true}).click()
 await page.waitForTimeout(4000);
});

