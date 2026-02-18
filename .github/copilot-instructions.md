# Copilot Instructions for dms-test-automation

## Project Overview
This project is a Playwright-based end-to-end test automation suite for the "Demand Central" web application. All tests are written in TypeScript and reside in the `tests/` directory. The configuration is managed via `playwright.config.ts`.

## Key Files & Structure
- `playwright.config.ts`: Main Playwright configuration. Sets up test directory, timeouts, retries, reporting, and device settings.
- `tests/`: Contains all test specs (e.g., `example.spec.ts`).
- `screenshots/`: Stores screenshots taken during test failures or as specified in tests.
- `playwright-report/` and `html-report-*`: Contain generated HTML reports for test runs.

## Developer Workflows
- **Run all tests:**
  ```
  npx playwright test
  ```
- **Run a specific test file:**
  ```
  npx playwright test tests/example.spec.ts
  ```
- **View HTML report:**
  Open `playwright-report/index.html` after a test run.
- **Screenshots:**
  Screenshots are saved in `screenshots/` and can also be explicitly saved in tests.

## Project-Specific Conventions
- **Test Structure:**
  - Use Playwright's `test()` and `expect()` APIs.
  - Each test should be self-contained and not depend on the state from other tests.
  - Use explicit waits (`waitForTimeout`) only when necessary; prefer Playwright's built-in waiting mechanisms.
- **Authentication:**
  - Credentials are currently hardcoded in `example.spec.ts` for demonstration. For production, use environment variables or secure vaults.
- **Reporting:**
  - HTML reports are timestamped and stored in the root or `playwright-report/`.
  - Only Chromium is enabled by default; other browsers are commented in the config.

## Integration & Dependencies
- Uses `@playwright/test` and `playwright` as dev dependencies.
- No custom build steps; tests are run directly with Playwright CLI.

## Extending the Suite
- Add new test files in `tests/`.
- Update `playwright.config.ts` to adjust global settings or enable more browsers.
- Follow the structure in `example.spec.ts` for new tests.

## Example Test Pattern
```
test('Test name', async ({ page }) => {
  await page.goto('https://example.com');
  // ...actions...
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## References
- [Playwright Docs](https://playwright.dev/docs/intro)
- Key config: [playwright.config.ts](../playwright.config.ts)
- Example test: [tests/example.spec.ts](../tests/example.spec.ts)
