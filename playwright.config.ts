// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const ARTIFACTS_DIR = `playwright-results/artifacts/${timestamp}`;
const REPORTS_DIR = 'playwright-results/reports';

export default defineConfig({
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',
  testDir: './tests',
  // Centralized folder for all test artifacts
  outputDir: ARTIFACTS_DIR,
  timeout: 100 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 3,
  reporter: [
    ['html', { outputFolder: REPORTS_DIR, open: 'never', reportFile: `report-${timestamp}.html` }]
  ],
globalSetup:require.resolve('./config/global-setup'),
  use: 
  {
    headless: false,
    baseURL: 'https://talentcentral-dev-v2.altimetrik.com/',
    //  baseURL: 'https://talentcentral-qa-v2.altimetrik.com/',
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storage/chromiumStorageState.json' },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: 'storage/firefoxStorageState.json' }
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], storageState: 'storage/webkitStorageState.json'},
    // },
  ],
});
