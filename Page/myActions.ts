import { Page, expect } from '@playwright/test';
import { ScreenshotsManager } from '../utils/screenshotsManager';

export class MyActions {

    constructor(
    readonly page: Page,
    private readonly shots?: ScreenshotsManager // optional if you call shots sometimes
  ) {}
    private modalWindow() {
        return this.page.locator(
            'div.ant-drawer-content.dms-enrichment-modal[role="dialog"][aria-modal="true"]'
        );
    }
    private readonly usernameInput = this.page.locator('[name="loginfmt"]');
    private readonly passwordInput = this.page.locator('[name="Password"]');
    private readonly signInButton = this.page.locator('#idSIButton9');
    private readonly submitButton = this.page.locator('#submitButton');
    private readonly demandCentralLink = this.page.getByRole('menuitem', { name: /Demand Central/i });
    private readonly createPositionButton = this.page.getByRole('button', { name: /create position/i });
    private readonly openingsInput = this.page.locator("//*[@id='noOfOpening']");
    private readonly nextButtonCreatePosition = this.page.getByRole('button', { name: /Next/i });
    private readonly confirmation = this.page.getByText(/New position/i);
    private readonly editButtons = this.page.locator('button:has-text("Edit")');
    private readonly targetOnboardingDateInput = this.page.locator('[id="targetOnboardingDate"]')
    private readonly targetBillingDateInput = this.page.locator('[id="targetBillingDate"]');
    private readonly countryInput = this.page.locator('[id="country"]');
    private readonly countryListInput = this.page.locator('div[class="rc-virtual-list-holder"] div[title="India"]:visible');

    private readonly companyInput = this.page.locator('[id="company"]')
    private readonly engagementTypeInput = this.page.locator('[id="engagementType"]');
    private readonly geographyInput = this.page.locator('[id="geography"]');
    private readonly confidentialHireToggle = this.page.locator('//button[@id="confidentialHire"]//span[@class="ant-switch-inner"]');
    private readonly setAsPriorityJobToggle = this.page.locator('//button[@id="setAsPriorityJob"]//span[@class="ant-switch-inner"]');
    private readonly jobFamilyInput = this.page.locator('[id="jobFamily"]');
    private readonly availableRolesSection = this.page.locator('text=Available Roles');
    private readonly accountInput = this.page.locator('[id="account"]');
    private readonly projectInput = this.page.locator('[id="project"]');
    private readonly businessLocationInput = this.page.locator('[id="businessLocation"]');
    private readonly jobLocationInput = this.page.locator('[id="jobLocation"]');
    private readonly targetAnnualIncentiveInput = this.page.locator('[id="targetAnnualIncentive"]');
    private readonly stockOptionEquityInput = this.page.locator('[id="stockOptionEquity"]');
    private readonly workingModelInput = this.page.locator('[id="workingModel"]');
    private readonly eventReasonInput = this.page.locator('[id="eventReason"]');
    private readonly primarySkillsInput = this.page.locator('[id="primarySkills"]');
    private readonly generateWithAIButton = this.page.getByText("Generate with AI", { exact: true });
    private readonly loader = this.page.locator('span.ant-spin-dot.ant-spin-dot-spin');
    private readonly jobOverviewField = this.page.locator('[class*="ql-editor"]');
    private readonly nextButton = this.page.getByRole('button', { name: /Next/i });
    private readonly updateButton = this.page.getByText('Update', { exact: true });
    private readonly positionCreationConfirmation = this.page.getByText(/Position updated successfully. Awaiting Approval./i);
    private readonly confirmationPopupCloseButton = this.page.locator('div[class*="ant-modal-content"] button[aria-label="Close"]');
    private readonly positionUpdatedSuccessfullyMessage = this.page.getByText(/Position updated successfully. Awaiting Approval./i);
    private readonly positionCreationSuccessMessage = this.page.getByText(/Position created successfully/i);


    async login() {
        await this.page.goto('https://talentcentral-dev-v2.altimetrik.com/');
        await this.page.waitForTimeout(5000);
        await this.usernameInput.fill('sbhogadi@altimetrik.com');
        await this.signInButton.click();
        await this.page.waitForTimeout(5000);
        await this.passwordInput.fill('JoshAlti@12358@');
        await this.submitButton.click();
        await this.page.waitForTimeout(5000);
        await this.signInButton.click();
        await this.page.waitForTimeout(5000);
        await expect(this.page).toHaveTitle(/Workbench/, { timeout: 30000 });
    }

    async navigateToDemandCentral() {
        const demandCentralLink = this.demandCentralLink;
        await expect(demandCentralLink).toBeVisible({ timeout: 10000 });
        await demandCentralLink.click();
        await this.page.waitForTimeout(5000);
        if(this.shots) await this.shots.capture('navigated-to-demand-central');
        // await this.page.screenshot({ path: 'screenshot-after-title.png', fullPage: true });
    }

    async createCorporatePosition(data: { noOfOpenings: string }) {
        const createPositionButton = this.createPositionButton;
        await expect(createPositionButton).toBeVisible({ timeout: 10000 });
        await createPositionButton.click();
        const openingsInput = this.openingsInput;
        await expect(openingsInput).toBeVisible({ timeout: 10000 });
        await openingsInput.fill(data.noOfOpenings);
        const nextButtonCreatePosition = this.nextButtonCreatePosition;
        await expect(nextButtonCreatePosition).toBeVisible({ timeout: 10000 });
        await nextButtonCreatePosition.click();
        const confirmation = this.confirmation;
        await expect(confirmation).toBeVisible({ timeout: 10000 });
        if(this.shots) await this.shots.capture('created-corporate-position');
        // await this.page.screenshot({ path: 'screenshot-after-creating-position.png', fullPage: true });
    }
    async fillPositionDetails_sectionA(data: any) {
        await this.page.waitForTimeout(5000);
        await this.editButtons.first().click();
        // await expect(this.modalWindow()).toBeVisible({ timeout: 10000 });

        await this.page.waitForTimeout(5000);
        await this.targetOnboardingDateInput.fill(data.targetOnboardingDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(2000);
        await this.targetBillingDateInput.fill(data.targetBillingDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(2000);
        await this.countryInput.fill(data.country);
        await this.page.waitForTimeout(2000);
        await this.countryListInput.click();
        await this.page.waitForTimeout(2000);
        // 5. Wait for 'Company' value to be auto-filled as per country
        await expect(this.companyInput).toHaveValue(data.company, { timeout: 10000 });
        // 6. Select 'Engagement Type' from dropdown

        await this.engagementTypeInput.fill(data.engagementType);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="Corporate"]:visible');
        await this.page.waitForTimeout(2000);
        // 7. Select 'Geography' from dropdown
        await this.geographyInput.fill(data.geography);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="APAC"]:visible');
        await this.page.waitForTimeout(2000);
        // 8. Click 'Next' button
        const nextButtonA = this.page.getByRole('button', { name: /Next/i });
        await expect(nextButtonA).toBeVisible({ timeout: 10000 });
        if(this.shots) await this.shots.capture('section-A-after-completion');
        await nextButtonA.click();
        await this.page.waitForTimeout(5000);

    }
    async fillPositionDetails_sectionB(data: any) {
        // Step 5: Fill additional details in the Update Information modal
        // 1. Click on the 2nd 'Edit' button
        //  await this.page.locator('button:has-text("Edit")').nth(1).click();
        // 2. Wait for 'Update Information' modal popup
        await expect(this.page.locator('text=Update Information')).toBeVisible({ timeout: 10000 });
        // 3. Switch on the toggle buttons for 'Confidential Hire' and 'Set as priority job'
        if (data.confidentialHire) {
            await this.page.locator('//button[@id="confidentialHire"]//span[@class="ant-switch-inner"]').click();
            await this.page.waitForTimeout(2000);
        }
        if (data.setAsPriorityJob) {
            await this.page.locator('//button[@id="setAsPriorityJob"]//span[@class="ant-switch-inner"]').click();
            await this.page.waitForTimeout(2000);

        }

        // 4. Select 'Job Family' as 'Product and Platform Engineering' and wait for 'Available Roles' section
        await this.jobFamilyInput.fill(data.jobFamily);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.jobFamily + '"]:visible');
        await this.page.waitForTimeout(2000);


        await expect(this.page.locator('text=Available Roles')).toBeVisible({ timeout: 10000 });
        // 5. Select the radio button for 'IN-PPENG-DENG' from the Available Roles section
        await this.page.getByLabel('IN-PPENG-DENG', { exact: true }).click();
        await this.page.waitForTimeout(2000);

        //  // 6. Select 'Work authorization type' as 'Permanent Resident'
        //  await this.page.selectOption('[name="workAuthorizationType"]', { label: 'Permanent Resident' });


        // 7. Select 'Accuount Name' as 'APAC BU Internal Customer'
        await this.page.fill('[id="account"]', data.account);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.account + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Project Name' as 'ACG - AAA - Account General'
        await this.page.fill('[id="project"]', data.project);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.project + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Business Location' as 'Chennai'
        await this.page.fill('[id="businessLocation"]', data.businessLocation);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.businessLocation + '"]:visible');
        await this.page.waitForTimeout(2000);

        // 7. Select 'Job Location' as 'Chennai'
        await this.page.locator('[id="jobLocation"]').click();
        await this.page.fill('[id="jobLocation"]', data.businessLocation);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.jobLocation + '"]:visible');
        await this.page.waitForTimeout(2000);


        // 10. Enter '10000' in Target Annual Incentive
        await this.page.fill('[id="targetAnnualIncentive"]', data.targetAnnualIncentive);
        // 11. Select 'Stock Option Equity' as 'No'
        await this.page.fill('[id="stockOptionEquity"]', data.stockOptionEquity);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.stockOptionEquity + '"]:visible');
        await this.page.waitForTimeout(2000);
        // 12. Select 'Working Model' as 'Altimetrik Office'
        await this.page.fill('[id="workingModel"]', data.workingModel);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.workingModel + '"]:visible');
        await this.page.waitForTimeout(2000);
        // 13. Select 'Event Reason' as 'Client Requested'
        await this.page.fill('[id="eventReason"]',data.eventReason);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.eventReason + '"]:visible');
        await this.page.waitForTimeout(2000);
        // 15. Wait for 'Next' button to be enabled and click
        const nextButtonB = this.page.getByRole('button', { name: /Next/i });
        await expect(nextButtonB).toBeVisible({ timeout: 10000 });
        if(this.shots) await this.shots.capture('section-B-after-completion');
        // await this.page.screenshot({ path: 'section B-after-completion.png', fullPage: true })
        await nextButtonB.click();
        await this.page.waitForTimeout(5000);
    }

    async fillPositionDetails_sectionC() {
        await expect(this.page.getByText(/Update Information/i)).toBeVisible({ timeout: 10000 });
        const nextButtonC = this.page.getByRole('button', { name: /Next/i });
        await expect(nextButtonC).toBeVisible({ timeout: 10000 });
        if(this.shots) await this.shots.capture('section-C-after-completion');
        // await this.page.screenshot({ path: 'section C-after-completion.png', fullPage: true })
        await nextButtonC.click();
        await this.page.waitForTimeout(5000);
    }
    async fillPositionDetails_sectionD(data: any) {
        await expect(this.page.getByText(/Update Information/i)).toBeVisible({ timeout: 10000 });
        await this.page.locator('[id="primarySkills"]').click();
        await this.page.fill('[id="primarySkills"]', data.primarySkills);
        await this.page.click('div[class="rc-virtual-list-holder"] div[title="' + data.primarySkills + '"]:visible');
        await this.page.waitForTimeout(2000);

        // Click "Generate with AI" button to generate job description and related fields
        await this.page.getByText("Generate with AI", { exact: true }).click();
        await this.page.waitForTimeout(2000);

        // Wait for loader to appear and then disappear
        const loader = this.page.locator('span.ant-spin-dot.ant-spin-dot-spin');
        await expect(loader).toBeVisible({ timeout: 10000 });
        await expect(loader).toBeHidden({ timeout: 60000 });

        // Wait for AI-generated content to populate mandatory fields
        // Check that Job Overview field is populated (not empty or just "-")
        await this.page.waitForFunction(() => {
            const jobOverviewElement = document.querySelector('[class*="ql-editor"]');
            return jobOverviewElement && jobOverviewElement.textContent && jobOverviewElement.textContent.trim().length > 10;
        }, { timeout: 30000 });

        // Verify that the form validation passes by waiting for Next button to be accessible
        const nextButtonD = this.page.getByRole('button', { name: /Next/i });
        await expect(nextButtonD).toBeEnabled({ timeout: 15000 });

        // Wait a bit more to ensure all fields are properly rendered
        await this.page.waitForTimeout(2000);
        if(this.shots) await this.shots.capture('section-D-after-completion');
        await nextButtonD.click();
        await this.page.waitForTimeout(5000);
    }
    async verifyUpdateButtonEnabled() {
        await expect(this.page.getByText('Update', { exact: true })).toBeEnabled({ timeout: 10000 });
        if(this.shots) await this.shots.capture('prviewPage');
        // await this.page.screenshot({ path: 'prviewPage.png', fullPage: true });
        await this.page.getByText('Update', { exact: true }).click();
        await this.page.waitForTimeout(5000);
    }
    async verifyPositionCreation() {

            const confirmation = this.page.getByText(/Position updated successfully. Awaiting Approval./i);
            await expect(confirmation).toBeVisible({ timeout: 10000 });
            if(this.shots) await this.shots.capture('positionCreated');
            // await this.page.screenshot({ path: 'positionCreated.png', fullPage: true });

            // Close the confirmation popup using aria-label of the close button
            await this.page.locator('div[class*="ant-modal-content"] button[aria-label="Close"]').click();
            await this.page.waitForTimeout(5000);
        }
}

