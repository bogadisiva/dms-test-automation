/**
 * Demand Creation - Updated UI Test Suite
 * 
 * This test suite covers the UPDATED single-screen Demand Creation flow.
 * The application UI has been refactored to display all sections on one screen
 * instead of the previous multi-modal approach.
 * 
 * This is a separate suite from demandcreation.spec.ts (old UI tests)
 * to ensure backward compatibility and clear separation of concerns.
 */

import { test, expect } from '../config/fixtures';
import { corporateDemandCentral } from '../Page/corporate_demandCentral';
import { login } from '../Page/login';
import scenarios from '../test-data/testfile.json';

type Scenario = {
  name: string;
  noOfOpenings: string;

  targetOnboardingDate: string;
  targetBillingDate: string;
  country: string;
  company: string;
  engagementType: string;
  geography: string;
  confidentialHire: boolean;
  setAsPriorityJob: boolean;
  jobFamily: string;
  roleLabel: string;
  account: string;
  project: string;
  businessLocation: string;
  jobLocation: string;
  targetAnnualIncentive: string;
  stockOptionEquity: string;
  workingModel: string;
  eventReason: string;
  primarySkills: string;
};

test.beforeAll(async () => {
  console.log("**Updated UI Test Suite Started**");
});

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test.afterAll(async () => {
  const testStatus = test.info().title + ' Test Status ' + test.info().status;
  console.log('**Updated UI Test Suite Ended** ' + testStatus);
});

test.use({
  colorScheme: 'dark'
});

/**
 * Test: Create Corporate Position - Updated Single-Screen UI
 * 
 * This test validates the complete demand creation flow on the new single-screen UI.
 * All sections (A, B, C, D) are now on one screen instead of multiple modals.
 */
(scenarios as Scenario[]).forEach((scenario) => {
  test(
    `Create a corporate position for ${scenario.name}`,
    { tag: '@smoke' },
    async ({ corpDemandCentral, login }) => {
      test.setTimeout(180000); // 3 minutes timeout

      // Step 1: Navigate to Demand Central
      await test.step('Navigate to Demand Central (Updated UI)', async () => {
        await login.navigateToDemandCentral();
      });

      await test.step('Select Job Type as Corporate Position', async () => {
        await corpDemandCentral.createCorporatePosition();
      });

      await test.step('Job Details', async () => {
        await corpDemandCentral.fillJobDetails(scenario);
      });

      // Step 4: Verify Update button is enabled
      await test.step('Verify form validation and enable Update button', async () => {
        await corpDemandCentral.verifyPublishButtonEnabled();
      });

      // Step 5: Verify position creation success
      await test.step('Verify position creation success', async () => {
        await corpDemandCentral.verifyPositionCreation();
      });
    });
});