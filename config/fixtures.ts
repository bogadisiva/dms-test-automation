import { test as base, expect } from '@playwright/test';
import { MyActions } from '../Page/myActions';
import { ScreenshotsManager } from '../utils/screenshotsManager';
type TestFixtures = {
    myActions: MyActions;
    shots: ScreenshotsManager;
};

type WorkerFixtures = {
    runTs: string;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
    // ✅ worker-scoped: created once per worker (good for parallel)
    runTs: [async ({ }, use) => {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        await use(ts);
    }, { scope: 'worker' }],

    // ✅ test-scoped: gets TestInfo
    shots: async ({ page, runTs }, use, testInfo) => {
        await use(new ScreenshotsManager(page, testInfo, 'screenshots', runTs));
    },

    myActions: async ({ page }, use, testInfo) => {
        // await page.goto('/', { waitUntil: 'domcontentloaded' });
        const shots = new ScreenshotsManager(page, testInfo, 'screenshots', process.env.RUN_TS ?? 'local');
        await use(new MyActions(page, shots));
    },
});

export { expect };