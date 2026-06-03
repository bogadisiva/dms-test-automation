import { Page } from '@playwright/test';

export class DemandCentralLocators {
  constructor(private page: Page) {}

  // Authentication Locators
  get usernameInput() {
    return this.page.locator('[name="loginfmt"]');
  }

  get passwordInput() {
    return this.page.locator('[name="Password"]');
  }

  get signInButton() {
    return this.page.locator('#idSIButton9');
  }

  get submitButton() {
    return this.page.locator('#submitButton');
  }

  // Navigation
  get demandCentralLink() {
    return this.page.getByRole('menuitem', { name: /Demand Central/i });
  }

  // Position Creation
  get createPositionButton() {
    return this.page.getByRole('button', { name: /create position/i });
  }

  get openingsInput() {
    return this.page.locator("//*[@id='noOfOpening']");
  }

   // Position Creation
  get createReplacedPositionButton() {
  return this.page.locator('input[type="radio"][value="REPLACEMENT"]');
  }

  get enterReqId() {
    return this.page.locator("//*[@id='reqId']");
  }

  get nextButtonCreatePosition() {
    return this.page.getByRole('button', { name: /Next/i });
  }

  get confirmation() {
    return this.page.getByText(/New position/i);
  }

  get editButtons() {
    return this.page.locator('button:has-text("Edit")');
  }

  // Date Inputs
  get targetOnboardingDateInput() {
    return this.page.locator('[id="targetOnboardingDate"]');
  }

  get targetBillingDateInput() {
    return this.page.locator('[id="targetBillingDate"]');
  }

  // Dropdown Inputs
  get countryInput() {
    return this.page.locator('[id="country"]');
  }

  get countryListInput() {
    return this.page.locator('div[class="rc-virtual-list-holder"] div[title="India"]:visible');
  }

  get companyInput() {
    return this.page.locator('[id="company"]');
  }

  get companyNameSelected() {
    return this.page.locator("(//input[@id='company']/../..//span)[2]");
  }

  get engagementTypeInput() {
    return this.page.locator('[id="engagementType"]');
  }

  get geographyInput() {
    return this.page.locator('[id="geography"]');
  }

  get confidentialHireToggle() {
    return this.page.locator('//button[@id="confidentialHire"]//span[@class="ant-switch-inner"]');
  }

  get setAsPriorityJobToggle() {
    return this.page.locator('//button[@id="setAsPriorityJob"]//span[@class="ant-switch-inner"]');
  }

  get jobFamilyInput() {
    return this.page.locator('[id="jobFamily"]');
  }

  get availableRolesSection() {
    return this.page.locator('text=Available Roles');
  }

  // Form Fields
  get accountNameInput() {
    return this.page.locator('[id="accountName"]');
  }

  get projectInput() {
    return this.page.locator('[id="projectName"]');
  }

  get businessLocationInput() {
    return this.page.locator('[id="businessLocation"]');
  }

  get jobLocationInput() {
    return this.page.locator('[id="jobLocation"]');
  }

  get capabilityCentre() {
    return this.page.locator('[id="capabilityCentre"]');
  }

  get targetAnnualIncentiveInput() {
    return this.page.locator('[id="targetAnnualIncentive"]');
  }

  get stockOptionEquityInput() {
    return this.page.locator('[id="stockOptionEquity"]');
  }

  get workingModelInput() {
    return this.page.locator('[id="workingModel"]');
  }

  get eventReasonInput() {
    return this.page.locator('[id="eventReason"]');
  }

  get primarySkillsInput() {
    return this.page.locator('[id="primarySkills"]');
  }

  // AI Generation
  get generateWithAIButton() {
    return this.page.getByText("Generate with AI", { exact: true });
  }

  get loader() {
    return this.page.locator('span.ant-spin-dot.ant-spin-dot-spin');
  }

  get jobOverviewField() {
    return this.page.locator('[class*="ql-editor"]');
  }

  // Buttons
  get nextButton() {
    return this.page.getByRole('button', { name: /Next/i });
  }

  get updateButton() {
    return this.page.getByText('Update', { exact: true });
  }

  get publishButton() {
    return this.page.getByText('Publish', { exact: true });
  }

  get previewPublishButton() {
    return this.page.getByRole('button', { name: 'Preview & Publish' });
  }

  // Confirmations
  get positionCreationConfirmation() {
    return this.page.getByText(/Position updated successfully. Awaiting Approval./i);
  }

  get confirmationPopupCloseButton() {
    return this.page.locator('div[class*="ant-modal-content"] button[aria-label="Close"]');
  }

  get positionUpdatedSuccessfullyMessage() {
    return this.page.getByText(/Position updated successfully. Awaiting Approval./i);
  }

  get positionCreationSuccessMessage() {
    return this.page.getByText(/Position created successfully/i);
  }

  get positionPublishedSuccessMessage() {
    return this.page.getByText(/Position published successfully. Awaiting CFO Approval./i);
  }

  // Modal
  get modalWindow() {
    return this.page.locator(
      'div.ant-drawer-content.dms-enrichment-modal[role="dialog"][aria-modal="true"]'
    );
  }
  // Form Fields
  get accountGroupInput() {
    return this.page.locator('[id="customerAccountGroup"]');
  }
  get corpDemandType() {
    return this.page.locator('(//label[text()="Demand Type"]/..//label)[2]//div');
  }
  get replaceDemandType() {
    return this.page.locator('[id="demandType"]');
  }
}
