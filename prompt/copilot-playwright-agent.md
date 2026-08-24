Generate new tests that use the myActions fixture and keep the POM as the single source of selectors.
<!-- 
Replace waitForTimeout with assertion-based waits.

Use Playwright MCP tools to inspect the DOM and propose stable locators (getByRole, getByLabel, getByTestId) instead of XPath.

On failures, analyze the latest Playwright report/trace, identify the root cause, patch the POM, and give me the command to re-run the failing test in headed mode. -->
open the demand cetnral 