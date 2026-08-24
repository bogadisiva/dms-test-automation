import { Page } from '@playwright/test';

export class SFDCLocators {
  constructor(private page: Page) {}

  // ===== Authentication Locators =====
  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get logInButton() {
    return this.page.getByRole('button', { name: 'Log In to Sandbox' });
  }

  get verificationCodeInput() {
    return this.page.getByRole('textbox', { name: 'Verification Code' });
  }

  get verifyButton() {
    return this.page.getByRole('button', { name: 'Verify' });
  }

  // ===== Navigation Locators =====
  get opportunitiesListButton() {
    return this.page.getByRole('button', { name: 'Opportunities List' });
  }

  get newOpportunityMenuItem() {
    return this.page.getByRole('menuitem', { name: 'New Opportunity' });
  }

  // ===== Opportunity Type Selection =====
  get opportunityTypeRadioButton() {
    return this.page.locator('div:nth-child(3) > .slds-radio > .changeRecordTypeOptionLeftColumn > .slds-radio--faux');
  }

  // ===== Form Navigation =====
  get nextButton() {
    return this.page.getByRole('button', { name: 'Next' });
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
  }

  get backToOpportunityButton() {
    return this.page.getByRole('button', { name: 'Back To Opportunity' });
  }

  // ===== Opportunity Details - Text Inputs =====
  get opportunityNameInput() {
    return this.page.getByRole('textbox', { name: 'Opportunity Name' });
  }

  get projectedStartDateInput() {
    return this.page.getByRole('textbox', { name: 'Projected Start Date' });
  }

  get closeDateInput() {
    return this.page.getByRole('textbox', { name: 'Close Date' });
  }

  get projectedEndDateInput() {
    return this.page.getByRole('textbox', { name: 'Projected End Date' });
  }

  // ===== Opportunity Details - Dropdowns/Comboboxes =====
  get accountNameCombobox() {
    return this.page.getByRole('combobox', { name: 'Account Name' });
  }

  get billingTypeCombobox() {
    return this.page.getByRole('combobox', { name: 'Billing Type' });
  }

  get businessUnitCombobox() {
    return this.page.getByRole('combobox', { name: 'Business Unit (B.U.)' });
  }

  get stageCombobox() {
    return this.page.getByRole('combobox', { name: 'Stage' });
  }

  get opportunityCurrencyCombobox() {
    return this.page.getByRole('combobox', { name: 'Opportunity Currency' });
  }

  get engagementTypeCombobox() {
    return this.page.getByRole('combobox', { name: 'Engagement Type (Interview' });
  }

  get fulfilledByCombobox() {
    return this.page.getByRole('combobox', { name: 'Fulfilled By' });
  }

  // ===== Opportunity Details - Amount & Location =====
  get amountSpinbutton() {
    return this.page.getByRole('spinbutton', { name: 'Amount', exact: true });
  }

  get locationLabel() {
    return this.page.getByLabel('*Location');
  }

  get moveSelectionButton() {
    return this.page.getByLabel('*Location').getByRole('button', { name: 'Move selection to Chosen' });
  }

  // ===== Opportunity Options - Checkboxes & Links =====
  get flagForFulfillmentCheckbox() {
    return this.page.getByRole('checkbox', { name: 'Flag For Fulfillment' });
  }

  get stageLink() {
    return this.page.getByRole('link', { name: 'Stage' });
  }

  get editFlagForFulfillmentButton() {
    return this.page.getByRole('button', { name: 'Edit Flag For Fulfillment' });
  }

  // ===== Dropdown Options & Date Navigation =====
   billingTypeOption(billingType: string) {
    return this.page.getByRole('option', { name: billingType });
  }

  get proposeOption() {
    return this.page.getByRole('option', { name: 'Propose' });
  }

  get usdCurrencyOption() {
    return this.page.getByTitle('USD - U.S. Dollar');
  }

  get indiaLocationOption() {
    return this.page.getByRole('option', { name: 'India' });
  }

  get nextMonthButton() {
    return this.page.getByRole('button', { name: 'Next Month' });
  }

  get dateDay31Button() {
    return this.page.getByRole('button', { name: '31' });
  }

  // ===== Alert & Dialog Controls =====
  get closeErrorDialogButton() {
    return this.page.getByRole('button', { name: 'Close error dialog' });
  }

  // ===== Resource Forecasting Locators =====
  get categoryLabel() {
    return this.page.getByLabel('Category');
  }

  get continueToSaveDataButton() {
    return this.page.getByRole('button', { name: 'Continue To Save Data' });
  }

  get newButton() {
    return this.page.getByRole('button', { name: 'New', exact: true });
  }

  // ===== Resource Forecasting Input Fields =====
  get resourceHoursInput1346() {
    return this.page.locator('#input-1346');
  }

  get resourceHoursInput1348() {
    return this.page.locator('#input-1348');
  }

  get resourceHoursInput1349() {
    return this.page.locator('#input-1349');
  }

  get resourceHoursInput1350() {
    return this.page.locator('#input-1350');
  }

  get resourceHoursInput1351() {
    return this.page.locator('#input-1351');
  }

  get resourceHoursInput1352() {
    return this.page.locator('#input-1352');
  }

  get resourceHoursInput1353() {
    return this.page.locator('#input-1353');
  }

  get resourceHoursInput1354() {
    return this.page.locator('#input-1354');
  }

  get resourceHoursInput1355() {
    return this.page.locator('#input-1355');
  }

  get resourceNotesInput1340() {
    return this.page.locator('#input-1340');
  }

  // ===== Dynamic & Miscellaneous Locators =====
  get apacOption() {
    return this.page.locator('span').filter({ hasText: 'APAC' }).nth(1);
  }

  get bucket2ScrumOption() {
    return this.page.getByText('Bucket 2 - Scrum (managed by');
  }

  get aiDataOption() {
    return this.page.locator('#combobox-button-458-1-458').getByText('AI & Data');
  }

  selectAccountName(accountName: string) {
    return this.page.locator(`//div[@class='actionBody']//*[text()='${accountName}']`);
    // return this.page.getByText(accountName);
  }
  

  get pendingUpdatesText() {
    return this.page.getByText('Pending Updates').first();
  }

  get resourceForecastingIcon() {
    return this.page.locator('.slds-icon_container_circle > span > lightning-primitive-icon > .slds-icon > g > path').first();
  }

  // ===== Utility Methods for Common Selectors =====
  getTableCellByText(text: string) {
    return this.page.getByRole('cell', { name: text });
  }

  getTableRowByText(text: string) {
    return this.page.locator('td').filter({ hasText: text });
  }

  getSelectOptionByText(text: string) {
    return this.page.getByRole('option', { name: text });
  }
}
