import { Page, expect } from '@playwright/test';
import { ScreenshotsManager } from '../utils/screenshotsManager';
import { DemandCentralLocators } from '../utils/locators/demandCentralLocators';

export class login {
private locators: DemandCentralLocators;
    constructor(
        readonly page: Page,
        private readonly shots?: ScreenshotsManager // optional if you call shots sometimes
    ) { 
        this.locators = new DemandCentralLocators(page);
    }

    async login() {
        await this.page.goto('https://talentcentral-dev-v2.altimetrik.com/');
        await this.page.waitForTimeout(5000);
        await this.locators.usernameInput.fill('sbhogadi@altimetrik.com');
        await this.locators.signInButton.click();
        await this.page.waitForTimeout(5000);
        await this.locators.passwordInput.fill('JoshAlti@12358$');
        await this.locators.submitButton.click();
        await this.page.waitForTimeout(5000);
        await this.locators.signInButton.click();
        await this.page.waitForTimeout(5000);
        await expect(this.page).toHaveTitle(/Workbench/, { timeout: 30000 });
    }

    async navigateToDemandCentral() {
        const demandCentralLink = this.locators.demandCentralLink;
        await expect(demandCentralLink).toBeVisible({ timeout: 10000 });
        await demandCentralLink.click();
        await this.page.waitForTimeout(5000);
        if (this.shots) await this.shots.capture('navigated-to-demand-central');
        // await this.page.screenshot({ path: 'screenshot-after-title.png', fullPage: true });
    }
}

