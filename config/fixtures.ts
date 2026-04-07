import { test as base, expect } from '@playwright/test';
import { ScreenshotsManager } from '../utils/screenshotsManager';
import { corporateDemandCentral } from '../Page/corporate_demandCentral';
import { replacedemandCentral } from '../Page/replace_demandCentral';
import { login } from '../Page/login';

type TestFixtures = {
    shots: ScreenshotsManager;
    corpDemandCentral: corporateDemandCentral;
    replaceDemandCentral: replacedemandCentral;
    login: login;
};

type WorkerFixtures = {
    timestamp: string;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
    // ✅ worker-scoped: created once per worker (good for parallel)
    timestamp: [async ({ }, use) => {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        await use(ts);
    }, { scope: 'worker' }],

    // ✅ test-scoped: gets TestInfo
    shots: async ({ page, timestamp }, use, testInfo) => {
        await use(new ScreenshotsManager(page, testInfo, timestamp));
    },
    corpDemandCentral: async ({ page, timestamp }, use, testInfo) => {
        // await page.goto('/', { waitUntil: 'domcontentloaded' });
        const shots = new ScreenshotsManager(page, testInfo, timestamp);
        await use(new corporateDemandCentral(page, shots));
    },
    replaceDemandCentral: async ({ page, timestamp }, use, testInfo) => {
        // await page.goto('/', { waitUntil: 'domcontentloaded' });
        const shots = new ScreenshotsManager(page, testInfo, timestamp);
        await use(new replacedemandCentral(page, shots));
    },
    login: async ({ page, timestamp }, use, testInfo) => {
        // await page.goto('/', { waitUntil: 'domcontentloaded' });
        const shots = new ScreenshotsManager(page, testInfo, timestamp);
        await use(new login(page, shots));
    }
});

export { expect };