import { Page, expect } from '@playwright/test';
import { ScreenshotsManager } from '../utils/screenshotsManager';
import { SFDCLocators } from '../utils/locators/sfdcLocators';

export class SFDCPage {
    private locators: SFDCLocators;

    constructor(
        readonly page: Page,
        private readonly shots?: ScreenshotsManager // optional if you call shots sometimes
    ) {
        this.locators = new SFDCLocators(page);
    }

    // ===== Authentication Methods =====
    async login(username: string, password: string) {
        await this.locators.usernameInput.fill(username);
        await this.locators.usernameInput.press('Tab');
        await this.locators.passwordInput.fill(password);
        await this.locators.logInButton.click();
        await this.page.waitForTimeout(2000);
    }

    async enterVerificationCode(code: string) {
        await this.locators.verificationCodeInput.click();
        await this.locators.verificationCodeInput.fill(code);
        await this.locators.verifyButton.click();
        await this.page.waitForTimeout(5000);
    }

    // ===== Navigation Methods =====
    async navigateToOpportunitiesList() {
        await expect(this.locators.opportunitiesListButton).toBeVisible({ timeout: 10000 });
        await this.locators.opportunitiesListButton.click();
        await this.page.waitForTimeout(2000);
        if (this.shots) await this.shots.capture('navigated-to-opportunities');
    }

    async createNewOpportunity() {
        await expect(this.locators.newOpportunityMenuItem).toBeVisible({ timeout: 10000 });
        await this.locators.newOpportunityMenuItem.click();
        await this.page.waitForTimeout(2000);
    }

    async selectOpportunityType(data: any) {
        await expect(this.locators.opportunityTypeRadioButton).toBeVisible({ timeout: 10000 });
        await this.locators.opportunityTypeRadioButton.click();
        await this.locators.nextButton.click();
        await this.page.waitForTimeout(2000);
        if (this.shots) await this.shots.capture('selected-opportunity-type');
    }

    // ===== Opportunity Details Methods =====
    async fillOpportunityBasicDetails(data: any) {
        // Fill Opportunity Name
        await expect(this.locators.opportunityNameInput).toBeVisible({ timeout: 10000 });
        await this.locators.opportunityNameInput.fill(data.opportunityName);
        await this.page.waitForTimeout(1000);

        // Select Account Name
        await this.locators.accountNameCombobox.click();
        await this.locators.selectAccountName(data.accountName).click();
        await this.page.waitForTimeout(1000);

        // Select Billing Type
        await this.locators.billingTypeCombobox.click();
        await this.locators.billingTypeOption(data.billingType).click();
        await this.page.waitForTimeout(1000);

        // Select Business Unit
        await this.locators.businessUnitCombobox.click();
        await this.locators.apacOption.click();
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-basic-opportunity-details');
    }

    async fillOpportunityDates(data: any) {
        // Projected Start Date
        await this.locators.projectedStartDateInput.click();
        await this.locators.dateDay31Button.click();
        await this.page.waitForTimeout(1000);

        // Close Date
        await this.locators.closeDateInput.click();
        for (let i = 0; i < 6; i++) {
            await this.locators.nextMonthButton.click();
            await this.page.waitForTimeout(300);
        }
        await this.locators.dateDay31Button.click();
        await this.page.waitForTimeout(1000);

        // Stage
        await this.locators.stageCombobox.click();
        await this.locators.proposeOption.click();
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-opportunity-dates');
    }

    async fillOpportunityCurrency(data: any) {
        // Currency
        await this.locators.opportunityCurrencyCombobox.click();
        await this.locators.usdCurrencyOption.click();
        await this.page.waitForTimeout(1000);

        // Amount
        await this.locators.amountSpinbutton.click();
        await this.locators.amountSpinbutton.fill(data.amount || '10000');
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-opportunity-currency');
    }

    async fillOpportunityLocation(data: any) {
        // Location
        await this.locators.indiaLocationOption.click();
        await this.locators.moveSelectionButton.click();
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('selected-location');
    }

    async fillOpportunityDatesProjected(data: any) {
        // Projected End Date
        await this.locators.projectedEndDateInput.click();
        for (let i = 0; i < 6; i++) {
            await this.locators.nextMonthButton.click();
            await this.page.waitForTimeout(300);
        }
        await this.locators.dateDay31Button.click();
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-projected-end-date');
    }

    async fillOpportunityEngagementDetails(data: any) {
        // Engagement Type
        await this.locators.engagementTypeCombobox.click();
        await this.locators.bucket2ScrumOption.click();
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-engagement-details');
    }

    async toggleFlagForFulfillment(shouldCheck: boolean = true) {
        const checkbox = this.locators.flagForFulfillmentCheckbox;
        const isChecked = await checkbox.isChecked();
        
        if (shouldCheck && !isChecked) {
            await checkbox.check();
        } else if (!shouldCheck && isChecked) {
            await checkbox.uncheck();
        }
        await this.page.waitForTimeout(1000);
    }

    async selectFulfilledByTeam(team: string = 'AI & Data') {
        await this.locators.fulfilledByCombobox.click();
        await this.locators.aiDataOption.click();
        await this.page.waitForTimeout(1000);
    }

    async saveOpportunity() {
        await this.locators.saveButton.click();
        await this.page.waitForTimeout(3000);
    }

    async editStage(stageName: string = 'Propose') {
        await this.locators.stageLink.click();
        await this.locators.stageCombobox.click();
        await this.page.getByRole('option', { name: stageName }).click();
        await this.locators.saveButton.click();
        await this.page.waitForTimeout(3000);
    }

    async handleFulfillmentError() {
        const errorMessage = this.page.getByText('Please add Resources');
        await expect(errorMessage).toBeVisible({ timeout: 10000 });
        await this.locators.closeErrorDialogButton.click();
        await this.page.waitForTimeout(1000);
    }

    // ===== Resource Forecasting Methods =====
    async navigateToResourceForecastingCreateNew(recordId: string) {
        await this.locators.newButton.click();
        await this.page.goto(
            `https://alti--slkbid.sandbox.lightning.force.com/lightning/cmp/c__ResourceForecastingCreateNew?c__recordId=${recordId}`
        );
        await this.page.waitForTimeout(3000);
        if (this.shots) await this.shots.capture('navigated-to-resource-forecasting');
    }

    async fillResourceForecastingDetails(data: any) {
        // Select Role
        const roleCell = this.locators.getTableRowByText('--None--Assoiciate');
        const roleSelect = roleCell.getByLabel('', { exact: true });
        await roleSelect.selectOption('Senior Engineer');
        await this.page.waitForTimeout(1000);

        // Select Category
        await this.locators.categoryLabel.selectOption('Product and Platform Engineering');
        await this.page.waitForTimeout(1000);

        // Select Skill
        const skillCell = this.locators.getTableRowByText('--None--Embedded - C /');
        const skillSelect = skillCell.getByLabel('', { exact: true });
        await skillSelect.selectOption('Java Backend');
        await this.page.waitForTimeout(1000);

        // Select Location
        const locationCell = this.locators.getTableCellByText('--None--');
        const locationSelect = locationCell.getByLabel('', { exact: true });
        await locationSelect.selectOption('India');
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-resource-forecasting-details');
    }

    async fillResourceHours(data: any) {
        // Fill hours for different months
        const hoursPerMonth = data.hoursPerMonth || 25;
        
        await this.locators.resourceHoursInput1346.click();
        await this.locators.resourceHoursInput1346.fill('2');
        
        const cell2 = this.locators.getTableCellByText('2');
        await cell2.getByLabel('', { exact: true }).fill(hoursPerMonth.toString());
        await this.page.keyboard.press('Tab');

        // Fill remaining months
        const monthInputs = [
            this.locators.resourceHoursInput1348,
            this.locators.resourceHoursInput1349,
            this.locators.resourceHoursInput1350,
            this.locators.resourceHoursInput1351,
            this.locators.resourceHoursInput1352,
            this.locators.resourceHoursInput1353,
            this.locators.resourceHoursInput1354,
            this.locators.resourceHoursInput1355
        ];

        for (const input of monthInputs) {
            await input.fill('2');
            await input.press('Tab');
            await this.page.waitForTimeout(500);
        }

        // Fill Notes
        await this.locators.resourceNotesInput1340.fill(data.notes || 'Test');
        await this.page.waitForTimeout(1000);

        if (this.shots) await this.shots.capture('filled-resource-hours');
    }

    async saveResourceForecastingData() {
        await this.locators.saveButton.click();
        await this.page.waitForTimeout(2000);
        
        // Wait for Continue to Save Data button
        await expect(this.locators.continueToSaveDataButton).toBeVisible({ timeout: 10000 });
        await this.locators.continueToSaveDataButton.click();
        await this.page.waitForTimeout(3000);

        if (this.shots) await this.shots.capture('saved-resource-forecasting');
    }

    async backToOpportunity() {
        await this.locators.backToOpportunityButton.click();
        await this.page.waitForTimeout(3000);
        if (this.shots) await this.shots.capture('back-to-opportunity');
    }

    // ===== Fulfillment Edit Methods =====
    async editFlagForFulfillment() {
        await this.locators.editFlagForFulfillmentButton.click();
        await this.page.waitForTimeout(2000);
    }

    async checkFlagForFulfillmentAfterEdit() {
        await this.locators.flagForFulfillmentCheckbox.check();
        await this.locators.saveButton.click();
        await this.page.waitForTimeout(2000);
        if (this.shots) await this.shots.capture('updated-flag-for-fulfillment');
    }

    // ===== Pending Updates Methods =====
    async navigateToPendingUpdates() {
        await this.locators.newButton.click();
        await this.locators.resourceForecastingIcon.click();
        await this.page.waitForTimeout(2000);
    }

    async interactWithPendingUpdates() {
        const pendingUpdates = this.locators.pendingUpdatesText;
        await expect(pendingUpdates).toBeVisible({ timeout: 10000 });
        await pendingUpdates.click();
        await this.page.waitForTimeout(500);
        await pendingUpdates.dblclick();
        await this.page.waitForTimeout(500);
        await pendingUpdates.click();
        await this.page.waitForTimeout(500);

        if (this.shots) await this.shots.capture('pending-updates-interaction');
    }

    // ===== Utility Methods =====
    async waitForPageLoad(timeout: number = 5000) {
        await this.page.waitForTimeout(timeout);
    }

    async takeScreenshot(name: string) {
        if (this.shots) {
            await this.shots.capture(name);
        }
    }
}
