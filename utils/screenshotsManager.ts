import { Page, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ScreenshotsManager {
    constructor(
         private readonly page: Page,
        private readonly testInfo: TestInfo,
        // Include timestamp to match Playwright outputDir
        private readonly timestamp: string
    ) {}
     

    private safeName(value: string): string {
        return value.replace(/[<>:"/\\|?*\n\r\t]/g, '_').slice(0, 150);
    }
    private ensureDir(dir: string) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }
    private targetDir(): string {
        const project = this.safeName(this.testInfo.project.name);
        const title = this.safeName(this.testInfo.title);
        // Structure: playwright-results/artifacts/{timestamp}/project/test-title/
        const dir = path.join(process.cwd(), 'playwright-results/artifacts', this.timestamp, project, title);
        this.ensureDir(dir);
        return dir;
    }
    async capture(name: string, fullPage: boolean = true) {
        const fileName = `${this.safeName(name)}.png`;
        const filePath = path.join(this.targetDir(), fileName);
        await this.page.screenshot({ path: filePath, fullPage });
        // Attach into Playwright HTML report
        this.testInfo.attach(name, { path: filePath, contentType: 'image/png' });
        return filePath;
    }
}
