import {test,expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('Verify the table data', async ({ page }) => {
   console.log("**Test Stared**");
//    const tableRows =  page.locator('id=myTable').locator('tbody').locator('tr');
// await page.screenshot({ path: 'screenshot.png' });
await page.getByText('Demo Sites', { exact: true }).filter({visible:true}).hover();
await page.waitForLoadState('networkidle', { timeout: 10000 });


// await page.getByText('Demo Sites', { exact: true }).hover();
// await page.waitForTimeout(5000); // Wait for the dropdown to appear
await page.getByText('Practice Automation', { exact: true }).filter({visible:true}).hover();
// // await page.waitForTimeout(5000); // Wait for the dropdown to appear
await page.getByText('WebTable', { exact: true }).filter({visible:true}).click();


const myTable=  page.locator('#myTable');
const tableHeaderRow=  myTable.locator('thead tr');
const totalColumns = await tableHeaderRow.locator('th').count();
console.log(`Total number of columns in the table: ${totalColumns}`);

let columnIndex=-1;
for(let i=0;i<totalColumns;i++){
  const headerCellValue=await tableHeaderRow.locator('th').nth(i).innerText();
  if(headerCellValue.trim()=='Name')
  {
    columnIndex=i;
    console.log(`Header Cell: ${headerCellValue}`);  
    break;
  }
  
}



const tableRows=  await myTable.locator('tbody tr');
const rowCount = await tableRows.count();
console.log(`Total number of rows in the table: ${rowCount}`);


for(let i=0;i<rowCount;i++)
  {
    const row = await tableRows.nth(i);
    const cells = await row.locator('td');
    let cellValue1=await cells.nth(columnIndex).innerText();
        console.log(cellValue1);   

    // let cellValue2=await cells.nth(2).innerText();
    if(cellValue1.trim()=='Vinoth R')
    {
      console.log('Found the row with Vinoth R');
       await page.locator('#myTable tbody tr').nth(i).locator('td').nth(0).locator('input[type="checkbox"]').check();
       await page.waitForTimeout(2000); // Wait for 2 seconds after checking the checkbox
      break;

    }
    // console.log(cellValue2);   
}

});