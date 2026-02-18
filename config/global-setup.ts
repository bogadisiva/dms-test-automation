import { chromium, firefox, webkit, FullConfig, expect } from "@playwright/test";
import fs from "fs";


export default async function globalsetup(config: FullConfig) {
    const MAX_AGE_HOURS = 8;
    fs.mkdirSync('storage', { recursive: true });
    for (const project of config.projects) {
        const browserName = project.name as string;
        const { channel, storageState } = project.use;
        if (!storageState || typeof storageState !== 'string') continue;
        // 👇 SKIP if storage state already exists
        if (fs.existsSync(storageState as any) && !isFileOlderThanHours(storageState, MAX_AGE_HOURS)) {
            console.log(`Reusing existing session for ${project.name}`);
            continue;
        }
        let browserType;
        switch (browserName) {
            case 'chromium':
                browserType = chromium;
                break;
            case 'firefox':
                browserType = firefox;
                break;
            case 'webkit':
                browserType = webkit;
                break;
            default:
                continue;
        }
        // const launchOptions: any = {};
        // if (channel) launchOptions.channel = channel;
        const browser = await browserType.launch({ headless: false, channel: channel as any });
        const page = await browser.newPage();
        console.log(`**Running global setup for ${browserName}**`);

        await page.goto('https://talentcentral-dev-v2.altimetrik.com/');
        await page.waitForLoadState('domcontentloaded');

        const emailInput = page.locator('[name="loginfmt"]');
        await emailInput.waitFor({ state: 'visible', timeout: 15000 });
        await emailInput.fill('sbhogadi@altimetrik.com');

        const nextButton = page.locator('#idSIButton9');
        try {
            await nextButton.waitFor({ state: 'visible', timeout: 15000 });
            await nextButton.click();
        } catch (e) {
            // If the button isn't visible, continue — the flow may have auto-advanced
        }

        const passwordInput = page.locator('[name="Password"]');
        await passwordInput.waitFor({ state: 'visible', timeout: 20000 });
        await passwordInput.fill('@@@@@@@@');

        const submitBtn = page.locator('#submitButton');
        await submitBtn.waitFor({ state: 'visible', timeout: 15000 });
        await submitBtn.click();

        // Handle optional "Stay signed in?" dialog which may reuse the same id
        try {
            const staySignedIn = page.locator('#idSIButton9');
            await staySignedIn.waitFor({ state: 'visible', timeout: 15000 });
            await staySignedIn.click();
        } catch (e) {
            // Not always present — safe to continue
        }

        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle(/Workbench/, { timeout: 60000 });
        await page.context().storageState({ path: storageState as string });
        await browser.close();

    }
    function isFileOlderThanHours(filePath: string, hours: number): boolean {
        if (!fs.existsSync(filePath)) return true;
        const stats = fs.statSync(filePath);
        const ageMs = Date.now() - stats.mtimeMs;
        return ageMs > hours * 60 * 60 * 1000;
    }
}




