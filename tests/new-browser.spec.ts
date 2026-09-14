import {expect,test} from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

await page.getByText('Demo Sites', { exact: true }).filter({visible:true}).hover();
await page.waitForLoadState('networkidle', { timeout: 10000 });
await page.getByText('Practice Automation', { exact: true }).filter({visible:true}).hover();
await page.waitForLoadState('networkidle', { timeout: 10000 });
await page.getByText('Multiple Windows', { exact: true }).filter({visible:true}).click();
await page.waitForLoadState('networkidle', { timeout: 10000 });

});
test.skip('verify the new page window',async ({page,context})=>{

const [newWindow] = await Promise.all([
  context.waitForEvent('page'),
  await page.getByRole('button',{name:'New Browser Window'}).click()
]);
await newWindow.waitForLoadState();
console.log('old window title:', await page.title());
console.log('new window title:', await newWindow.title());

});

test('verify the new page tab',async ({page,context})=>{

const [newWindow] = await Promise.all([
  context.waitForEvent('page'),
  await page.getByRole('button',{name:'New Browser Tab'}).click()
]);
await newWindow.waitForLoadState();
console.log('old window title:', await page.title());
console.log('new window title:', await newWindow.title());

});

test('verify the new message window',async({page,context})=>{

const [newMsgWindow]=await Promise.all([
    context.waitForEvent('page'),
    await page.getByRole('button',{name:'New Message Window'}).click()
]);
await newMsgWindow.waitForLoadState();
console.log('old window title:', await page.title());
let newMsgText = await newMsgWindow.locator('body').innerText();
// console.log('new window title:', await newMsgWindow.title());
console.log('new message text:', newMsgText);
});
    