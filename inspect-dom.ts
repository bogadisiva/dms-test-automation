import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

async function inspectDOM() {
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: false });
    
    // Create context with storage state for authentication
    const storageStatePath = './storage/chromiumStorageState.json';
    const contextOptions: any = {};
    
    if (fs.existsSync(storageStatePath)) {
      contextOptions.storageState = storageStatePath;
      console.log('✅ Loaded storage state from chromiumStorageState.json');
    }
    
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    // Navigate to base URL
    console.log('📱 Navigating to base URL...');
    await page.goto('https://talentcentral-dev-v2.altimetrik.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Try to navigate to Demand Central
    console.log('🔍 Looking for Demand Central link...');
    const demandCentralLink = page.locator("//*[text()='Demand Central']/..").first();
    
    if (await demandCentralLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('✅ Found Demand Central link');
      await demandCentralLink.click();
      await page.waitForTimeout(5000);
    } else {
      console.log('⚠️ Demand Central link not visible, continuing...');
    }

    // Take screenshot
    await page.screenshot({ path: './inspect-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved to inspect-screenshot.png');

    // Inspect multiple elements
    const elementsToInspect = [
      { label: 'Demand Central Link', locator: "//*[text()='Demand Central']/.." },
      { label: 'Create Position Button', locator: "//*[text()='Create position']/.." },
    ];

    for (const element of elementsToInspect) {
      console.log(`\n${'='.repeat(70)}`);
      console.log(`🔎 Inspecting: ${element.label}`);
      console.log(`${'='.repeat(70)}\n`);

      const locator = page.locator(element.locator).first();

      if (await locator.isVisible({ timeout: 5000 }).catch(() => false)) {
        console.log(`✅ Found "${element.label}"`);

        // Get the HTML
        const html = await locator.evaluate((el: Element) => {
          return el.outerHTML.substring(0, 300);
        });

        console.log('HTML:', html);

        // Get all attributes
        const allAttrs = await locator.evaluate((el: Element) => {
          const btn = (el.querySelector('button') || el) as HTMLElement;
          const attrs: Record<string, string> = {};
          Array.from(btn.attributes).forEach((attr: Attr) => {
            attrs[attr.name] = attr.value;
          });
          return attrs;
        });

        console.log('\nAttributes:', JSON.stringify(allAttrs, null, 2));

        // Test different locator strategies
        const textContent = await locator.evaluate((el: Element) => {
          return el.textContent?.trim() || '';
        });
        
        const role = await locator.evaluate((el: Element) => {
          return el.getAttribute('role') || 'unknown';
        });

        console.log(`\nElement Role: "${role}"`);
        console.log('\n📋 SUGGESTED LOCATORS:\n');

        // Strategy 1: getByRole with detected role
        try {
          const byRole = page.getByRole(role as any, { name: new RegExp(textContent, 'i') });
          const isVisible = await byRole.isVisible({ timeout: 2000 }).catch(() => false);
          console.log(`1️⃣  getByRole('${role}', { name: /${textContent}/i })`);
          console.log(`   Status: ${isVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}\n`);
        } catch (e) {
          console.log(`1️⃣  getByRole('${role}', { name: /${textContent}/i })`);
          console.log(`   Status: ❌ ERROR\n`);
        }

        // Strategy 2: getByText
        try {
          const byText = page.getByText(new RegExp(textContent, 'i'));
          const isVisible = await byText.isVisible({ timeout: 2000 }).catch(() => false);
          console.log(`2️⃣  getByText(/${textContent}/i)`);
          console.log(`   Status: ${isVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}\n`);
        } catch (e) {
          console.log(`2️⃣  getByText(/${textContent}/i)`);
          console.log(`   Status: ❌ ERROR\n`);
        }

      } else {
        console.log(`❌ "${element.label}" not found on page\n`);
      }
    }

    await context.close();
  } catch (error) {
    console.error('Error during inspection:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

inspectDOM();
