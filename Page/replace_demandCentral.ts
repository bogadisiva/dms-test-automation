import { Page, expect } from '@playwright/test';
import { ScreenshotsManager } from '../utils/screenshotsManager';
import { DemandCentralLocators } from '../utils/locators/demandCentralLocators';

export class replacedemandCentral {
    private locators: DemandCentralLocators;
    constructor(
        readonly page: Page,
        private readonly shots?: ScreenshotsManager // optional if you call shots sometimes
    ) {
        this.locators = new DemandCentralLocators(page);
    }
    private modalWindow() {
        return this.page.locator(
            'div.ant-drawer-content.dms-enrichment-modal[role="dialog"][aria-modal="true"]'
        );
    }


    // async login() {
    //     await this.page.goto('https://talentcentral-dev-v2.altimetrik.com/');
    //     await this.page.waitForTimeout(5000);
    //     await this.locators.usernameInput.fill('sbhogadi@altimetrik.com');
    //     await this.locators.signInButton.click();
    //     await this.page.waitForTimeout(5000);
    //     await this.locators.passwordInput.fill('JoshAlti@12358@');
    //     await this.locators.submitButton.click();
    //     await this.page.waitForTimeout(5000);
    //     await this.locators.signInButton.click();
    //     await this.page.waitForTimeout(5000);
    //     await expect(this.page).toHaveTitle(/Workbench/, { timeout: 30000 });
    // }

    // async navigateToDemandCentral() {
    //     const demandCentralLink = this.locators.demandCentralLink;
    //     await expect(demandCentralLink).toBeVisible({ timeout: 10000 });
    //     await demandCentralLink.click();
    //     await this.page.waitForTimeout(5000);
    //     if (this.shots) await this.shots.capture('navigated-to-demand-central');
    //     // await this.page.screenshot({ path: 'screenshot-after-title.png', fullPage: true });
    // }

    async createReplacedPosition() {
        const createPositionButton = this.locators.createPositionButton;
        await expect(createPositionButton).toBeVisible({ timeout: 10000 });
        await createPositionButton.click();

        await this.locators.createReplacedPositionButton.click();
        this.locators.enterReqId.fill('12345');
        const nextButtonCreatePosition = this.locators.nextButtonCreatePosition;
        await expect(nextButtonCreatePosition).toBeVisible({ timeout: 10000 });
        await nextButtonCreatePosition.click();
        const confirmation = this.locators.confirmation;
        await expect(confirmation).toBeVisible({ timeout: 10000 });
        if (this.shots) await this.shots.capture('created-replaced-position');
        // await this.page.screenshot({ path: 'screenshot-after-creating-position.png', fullPage: true });
    }
    async fillJobDetails(data: any) {
        await this.page.waitForTimeout(5000);
        // 4. Select 'Job Family' as 'Product and Platform Engineering' and wait for 'Available Roles' section
        await this.locators.jobFamilyInput.fill(data.jobFamily);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.jobFamily + '"]:visible');
        await this.page.waitForTimeout(2000);


        // await expect(this.page.locator('text=Available Roles')).toBeVisible({ timeout: 10000 });
        // 5. Select the radio button for 'IN-PPENG-SRENG' from the Available Roles section
        await this.page.getByRole('textbox', { name: 'Search...' }).click();
        await this.page.getByRole('textbox', { name: 'Search...' }).fill(data.roleLabel);
        //   await page.getByRole('radio', { name: 'IN-PPENG-SRENG' }).check();
        await this.page.getByLabel(data.roleLabel, { exact: true }).click();
        await this.page.waitForTimeout(2000);

        // 7. Select 'Accuount Group Name' as 'Altimetrik Internal Customer'
        await this.locators.accountGroupInput.fill('Altimetrik Internal Customer');
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + 'Altimetrik Internal Customer' + '"]:visible');
        await this.page.waitForTimeout(2000);


        // 7. Select 'Accuount Name' as 'APAC BU Internal Customer'
        await this.locators.accountNameInput.fill(data.account);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.account + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Project Name' as 'ACG - AAA - Account General'
        await this.locators.projectInput.fill(data.project);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.project + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Capability Center' as 'Product and Platform'
        await this.locators.capabilityCentre.fill(data.capabilityCentre);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.capabilityCentre + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Shift' as 'General Shift_COL'
        await this.page.fill('[id="shift"]', data.shift);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.shift + '"]:visible');
        await this.page.waitForTimeout(2000);


        await this.page.waitForTimeout(5000);
        await this.locators.targetOnboardingDateInput.fill(data.targetOnboardingDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(2000);
        await this.locators.targetBillingDateInput.fill(data.targetBillingDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Job Location'
        await this.locators.jobLocationInput.click();
        var jobLocationSplit=data.jobLocation.split('-').join(' ').trim(); // Convert "San Francisco-California-United States" to "San Francisco California United States"   
        await this.page.fill('[id="jobLocation"]', jobLocationSplit);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.jobLocation + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Business Location'
        await this.locators.businessLocationInput.fill(data.businessLocation);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.businessLocation + '"]:visible');
        await this.page.waitForTimeout(3000);


        await this.locators.countryInput.fill(data.country);
        await this.page.waitForTimeout(2000);
        await this.locators.countryListInput.click();
        await this.page.waitForTimeout(2000);
        // const companyInput = this.page.locator('[id="company"]');
        await expect(this.locators.companyNameSelected).toHaveText(data.company, { timeout: 10000 });
        // 6. Select 'Engagement Type' from dropdown


        //Event Reason        
        await this.locators.eventReasonInput.fill(data.eventReason);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.eventReason + '"]:visible');
        await this.page.waitForTimeout(2000);

        await this.locators.engagementTypeInput.fill(data.engagementType);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="Corporate"]:visible');
        await this.page.waitForTimeout(2000);

        await this.locators.replaceDemandType.fill(data.demandtypeReplacement);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.demandtypeReplacement + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 12. Select 'Working Model' as 'Altimetrik Office'
        await this.page.fill('[id="workingModel"]', data.workingModel);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.workingModel + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 12. Select 'Geography' as 'APAC'
        await this.page.fill('[id="geoGraphy"]', 'APAC');
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="APAC"]:visible');
        await this.page.waitForTimeout(2000);

        await this.locators.primarySkillsInput.click();
        await this.locators.primarySkillsInput.fill(data.primarySkills);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.primarySkills + '"]:visible');
        await this.page.waitForTimeout(2000);

        // Click "Generate with AI" button to generate job description and related fields
        await this.locators.generateWithAIButton.click();
        await this.page.waitForTimeout(2000);

        // Wait for loader to appear and then disappear
        const loader = this.locators.loader
        await expect(loader).toBeVisible({ timeout: 10000 });
        await expect(loader).toBeHidden({ timeout: 60000 });

        // Wait for AI-generated content to populate mandatory fields
        // Check that Job Overview field is populated (not empty or just "-")
        await this.page.waitForFunction(() => {
            const jobOverviewElement = document.querySelector('[class*="ql-editor"]');
            return jobOverviewElement && jobOverviewElement.textContent && jobOverviewElement.textContent.trim().length > 10;
        }, { timeout: 30000 });



        // Wait a bit more to ensure all fields are properly rendered
        await this.page.waitForTimeout(2000);
        if (this.shots) await this.shots.capture('after Job filling completion');
        await this.locators.previewPublishButton.click();

    }
    async verifyPublishButtonEnabled() {
        await expect(this.page.getByText('Publish', { exact: true })).toBeEnabled({ timeout: 10000 });
        if (this.shots) await this.shots.capture('prviewPage');
        // await this.page.screenshot({ path: 'prviewPage.png', fullPage: true });
        await this.page.getByText('Publish', { exact: true }).click();
        await this.page.waitForTimeout(5000);
    }
    async verifyPositionCreation() {

        const confirmation = this.page.getByText(/Position details saved successfully/i);
        await expect(confirmation).toBeVisible({ timeout: 10000 });
        if (this.shots) await this.shots.capture('positionCreated');
        // await this.page.screenshot({ path: 'positionCreated.png', fullPage: true });

        // Close the confirmation popup using aria-label of the close button
        await this.page.locator('div[class*="ant-modal-content"] button[aria-label="Close"]').click();
        await this.page.waitForTimeout(5000);
    }
}

