import {test,expect} from '@playwright/test';

const dropdownValues = ['New York City', 'London', 'Paris'];
test.beforeEach(async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

await page.getByText('Demo Sites', { exact: true }).filter({visible:true}).hover();
await page.waitForLoadState('networkidle', { timeout: 10000 });
await page.getByText('Practice Automation', { exact: true }).filter({visible:true}).hover();
await page.waitForLoadState('networkidle', { timeout: 10000 });
await page.getByText('DropDown', { exact: true }).filter({visible:true}).click();
await page.waitForLoadState('networkidle', { timeout: 10000 });
});    



// for(const value of dropdownValues) {
    
// test(`Verify and Select value from dropdown: ${value}`, async ({ page }) => {
    test(`Verify and Select value from dropdown`, async ({ page }) => {
// await page.locator('simpleDropdown').selectOption(value);
    const cityList:string[]=[];
    await page.locator('#select2-simpleDropdown-container').click();
    const options1 =  page.locator('.select2-results__options li');
    const count = await options1.count();
    console.log(`Total number of options in the dropdown: ${count}`);
    // await expect(options1.first()).toBeVisible();
    for(let i=0;i<count;i++){
    let optionText=await options1.nth(i).innerText();
    cityList.push(optionText.trim());
    }

console.log('Cities available:');
    console.log(cityList.toString());

    await page.getByRole('option',{name:'Mumbai'}).click();
    let dropdownValue= await page.locator('#select2-simpleDropdown-container').innerText();
    console.log('Selected dropdown value:',dropdownValue);
    await expect(page.locator('#select2-simpleDropdown-container')).toHaveText('Mumbai');

    // await expect(page.locator('#select2-simpleDropdown-container')).toHaveAttribute('title', 'New York City');


// const options = page.locator("select[id='simpleDropdown'] option");
// let optionsCount = await options.count();
// console.log(`Total number of options in the dropdown: ${optionsCount}`);
// for(let i=0;i<optionsCount;i++){
//     let optionText=await options.nth(i).innerText();
//     if(optionText.trim()=='New York City')
//     {
//         await page.locator("select[id='select2-simpleDropdown-container']").click();
//         await options.nth(i).click();
//         console.log(`Selected option: ${optionText}`);  
//         break;
//     }
// }
});
// }