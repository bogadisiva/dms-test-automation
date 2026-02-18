// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig({
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',
  testDir: './tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  // outputDir: 'test-results',
  timeout: 100 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 3,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never', reportFile: `report-${timestamp}.html` }]
  ],
globalSetup:require.resolve('./config/global-setup'),
  use: 
  {
    headless: false,
    baseURL: 'https://talentcentral-dev-v2.altimetrik.com/',
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // screenshotPath: 'test-results/screenshots',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storage/chromiumStorageState.json' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: 'storage/firefoxStorageState.json' }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'storage/webkitStorageState.json'},
    },
  ],
});
