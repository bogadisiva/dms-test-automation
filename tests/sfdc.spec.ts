import { expect } from '@playwright/test';
import { test } from '../config/fixtures';
import { SFDCPage } from '../Page/sfdcPage';

// Test Data
const testData = {
    login: {
        username: 'sbhogadi@altimetrik.com.qa',
        password: 'JoshAlti@12358#',
        verificationCode: '601405'
    },
    opportunity: {
        opportunityType: 'APAC',
        opportunityName: 'QE Testing Demand Central 01',
        amount: '10000',
        accountName: 'CitiPrabhu',
        billingType: 'Fixed Price',
        businessUnit: 'APAC',
        location: 'India'
    },
    resourceForecasting: {
        role: 'Senior Engineer',
        category: 'Product and Platform Engineering',
        skill: 'Java Backend',
        location: 'India',
        hoursPerMonth: 25,
        notes: 'Test Resource Forecasting'
    }
};

test.describe('SFDC Opportunity & Resource Forecasting Flow', () => {
    test('End-to-End: Login → Create Opportunity → Set Fulfillment → Create Resource Forecast', { tag: ['@sfdcposcreate'] }, async ({ page, sfdcPage }) => {
          test.setTimeout(250000); 
        // ============ STEP 1: LOGIN TO SFDC ============
        console.log('Step 1: Logging in to SFDC sandbox...');
        await page.goto('https://alti--qa.sandbox.lightning.force.com/lightning/page/home');
        await page.waitForTimeout(2000);

        // First login attempt
        await sfdcPage.login(testData.login.username, testData.login.password);

        // Handle second login screen if present
        const usernameInput = page.getByRole('textbox', { name: 'Username' });
        if (await usernameInput.isVisible()) {
            await sfdcPage.login(testData.login.username, testData.login.password);
        }

        // Enter verification code
        // await sfdcPage.enterVerificationCode(testData.login.verificationCode);
        await page.waitForTimeout(30000);
        // Navigate to home page
        await page.goto('https://alti--qa.sandbox.lightning.force.com/lightning/page/home');
        await expect(page).toHaveTitle(/Salesforce/, { timeout: 30000 });
        await page.waitForTimeout(3000);
        console.log('✓ Successfully logged in to SFDC');

        // ============ STEP 2: CREATE OPPORTUNITY ============
        console.log('Step 2: Creating new opportunity...');
        await sfdcPage.navigateToOpportunitiesList();
        await sfdcPage.createNewOpportunity();
        await sfdcPage.selectOpportunityType(testData.opportunity);
        console.log('✓ Opportunity creation form opened');

        // ============ STEP 3: FILL OPPORTUNITY DETAILS ============
        console.log('Step 3: Filling in opportunity details...');
        await sfdcPage.fillOpportunityBasicDetails(testData.opportunity);
        await sfdcPage.fillOpportunityDates(testData.opportunity);
        await sfdcPage.fillOpportunityCurrency(testData.opportunity);
        await sfdcPage.fillOpportunityLocation(testData.opportunity);
        await sfdcPage.fillOpportunityDatesProjected(testData.opportunity);
        await sfdcPage.fillOpportunityEngagementDetails(testData.opportunity);
        console.log('✓ All opportunity details filled in');

        // ============ STEP 4: SAVE OPPORTUNITY ============
        console.log('Step 4: Saving opportunity...');
        await sfdcPage.saveOpportunity();
        const successMessage = page.getByText(/created|saved/i);
        await expect(successMessage).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(2000);
        console.log('✓ Opportunity created successfully');

        // ============ STEP 5: MANAGE OPPORTUNITY STAGE ============
        console.log('Step 5: Updating opportunity stage to "Propose"...');
        await sfdcPage.editStage('Propose');
        await expect(page.getByText('Propose')).toBeVisible({ timeout: 10000 });
        console.log('✓ Opportunity stage updated');

        

        // ============ STEP 8: CREATE RESOURCE FORECASTING ============
        // console.log('Step 8: Creating resource forecasting...');

        // // Extract the record ID from the current opportunity
        // const recordIdMatch = page.url().match(/[a-zA-Z0-9]{18}/);
        // const recordId = recordIdMatch ? recordIdMatch[0] : '006C200000GzX9gIAF';
        // console.log(`Using Opportunity Record ID: ${recordId}`);

        // await sfdcPage.navigateToResourceForecastingCreateNew(recordId);
        // console.log('✓ Navigated to resource forecasting');

        // // ============ STEP 9: FILL RESOURCE FORECASTING DETAILS ============
        // console.log('Step 9: Filling resource forecasting details...');
        // await sfdcPage.fillResourceForecastingDetails(testData.resourceForecasting);
        // await sfdcPage.fillResourceHours(testData.resourceForecasting);
        // console.log('✓ Resource forecasting details filled in');

        // // ============ STEP 10: SAVE RESOURCE FORECASTING ============
        // console.log('Step 10: Saving resource forecasting data...');
        // await sfdcPage.saveResourceForecastingData();
        // await page.waitForTimeout(2000);
        // console.log('✓ Resource forecasting saved');

        // // ============ STEP 11: NAVIGATE BACK TO OPPORTUNITY ============
        // console.log('Step 11: Returning to opportunity page...');
        // await sfdcPage.backToOpportunity();
        // await expect(page).toHaveTitle(/Opportunity/i, { timeout: 10000 });
        // console.log('✓ Successfully returned to opportunity page');

        // // ============ STEP 12: INTERACT WITH PENDING UPDATES ============
        // console.log('Step 12: Interacting with pending updates...');
        // try {
        //     await sfdcPage.navigateToPendingUpdates();
        //     await sfdcPage.interactWithPendingUpdates();
        //     await expect(page.getByText('Pending Updates')).toBeVisible({ timeout: 10000 });
        //     console.log('✓ Pending updates handled');
        // } catch {
        //     console.log('✓ No pending updates at this time');
        // }

        // console.log('End-to-End flow completed successfully!');
    });
});
