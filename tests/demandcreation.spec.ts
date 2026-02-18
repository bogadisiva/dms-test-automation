// import { test, expect } from '@playwright/test';
// import { MyActions } from '../Page/myActions';
import { test, expect } from '../config/fixtures';
import scenarios from '../test-data/testfile.json';

type Scenario = {
  name: string;
  noOfOpenings: string;
  sectionA: { targetOnboardingDate: string;targetBillingDate: string;country: string;company: string;engagementType: string;geography: string;};
  sectionB: {confidentialHire: boolean;setAsPriorityJob: boolean;jobFamily: string;roleLabel: string;account: string;project: string;businessLocation: string;jobLocation: string;targetAnnualIncentive: string;stockOptionEquity: string;workingModel: string;eventReason: string;};
  sectionD: {primarySkills: string;};
  };

test.beforeAll(async () => {
  console.log("**Test Stared**")

});
test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});
test.afterAll(async () => {
  const teststatus = test.info().title + ' Test Status ' + test.info().status
  console.log('**Test Ended** ' + teststatus)
});
test.use({
  colorScheme: 'dark' // or 'light'
});
(scenarios as Scenario[]).forEach((scenario) => {

test(`create a corporate position for ${scenario.name}`, { tag: '@smoke' }, async ({ myActions }) => {
    test.setTimeout(180000); // Set timeout to 3 minutes for this test

    // const myActions = new MyActions(page);
    //  await myActions.login();
    await test.step('Navigate to Demand Central and Create Corporate Position', async () => {
      await myActions.navigateToDemandCentral();
    });
    await test.step('When I create a corporate position', async () => {
      await myActions.createCorporatePosition({ noOfOpenings: scenario.noOfOpenings });
    });
    await test.step('Then I fill all the sections and verify position creation', async () => {
      await myActions.fillPositionDetails_sectionA(scenario.sectionA);
      await myActions.fillPositionDetails_sectionB(scenario.sectionB);
      await myActions.fillPositionDetails_sectionC();
      await myActions.fillPositionDetails_sectionD(scenario.sectionD);
      await myActions.verifyUpdateButtonEnabled();
    });
    await test.step('And I verify position creation success message', async () => {
      await myActions.verifyPositionCreation();
    });


  });



});

