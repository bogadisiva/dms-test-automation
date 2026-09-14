import * as fs from 'fs';
import * as path from 'path';

/**
 * Cleanup utility to remove test results and artifacts
 */
export class TestResultsCleanup {
    private static readonly RESULTS_DIR = 'playwright-results';
    private static readonly ARTIFACTS_SUBDIR = 'artifacts';
    private static readonly REPORTS_SUBDIR = 'reports';

    /**
     * Remove all test results and artifacts
     */
    static clearAll(): void {
        const dir = path.join(process.cwd(), this.RESULTS_DIR);
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`Cleared: ${this.RESULTS_DIR}/`);
        } else {
            console.log(`No results directory found: ${this.RESULTS_DIR}/`);
        }
    }

    /**
     * Remove only artifacts (screenshots, traces, etc.)
     */
    static clearArtifacts(): void {
        const dir = path.join(process.cwd(), this.RESULTS_DIR, this.ARTIFACTS_SUBDIR);
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`Cleared artifacts: ${this.RESULTS_DIR}/${this.ARTIFACTS_SUBDIR}/`);
        } else {
            console.log(`No artifacts found: ${this.RESULTS_DIR}/${this.ARTIFACTS_SUBDIR}/`);
        }
    }

    /**
     * Remove only reports
     */
    static clearReports(): void {
        const dir = path.join(process.cwd(), this.RESULTS_DIR, this.REPORTS_SUBDIR);
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`Cleared reports: ${this.RESULTS_DIR}/${this.REPORTS_SUBDIR}/`);
        } else {
            console.log(`No reports found: ${this.RESULTS_DIR}/${this.REPORTS_SUBDIR}/`);
        }
    }

    /**
     * Get size of results directory in MB
     */
    static getSize(): number {
        const dir = path.join(process.cwd(), this.RESULTS_DIR);
        if (!fs.existsSync(dir)) return 0;

        let size = 0;
        const getFilesSize = (dirPath: string) => {
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    getFilesSize(filePath);
                } else {
                    size += stats.size;
                }
            });
        };

        getFilesSize(dir);
        return parseFloat((size / (1024 * 1024)).toFixed(2));
    }

    /**
     * Print cleanup summary
     */
    static printSummary(): void {
        const size = this.getSize();
        console.log(`\n Test Results Summary:`);
        console.log(`   Directory: ${this.RESULTS_DIR}/`);
        console.log(`   Size: ${size} MB\n`);
    }
}

// Run cleanup if called directly
const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

if (require.main === module) {
    switch (command) {
        case 'all':
            TestResultsCleanup.clearAll();
            break;
        case 'artifacts':
            TestResultsCleanup.clearArtifacts();
            break;
        case 'reports':
            TestResultsCleanup.clearReports();
            break;
        case 'size':
            TestResultsCleanup.printSummary();
            break;
        default:
            console.log(`\n🧹 Cleanup Utility\n`);
            console.log(`Usage: npx ts-node utils/cleanup.ts [command]\n`);
            console.log(`Commands:`);
            console.log(`  all       - Clear all results and artifacts`);
            console.log(`  artifacts - Clear only artifacts (screenshots, traces, etc.)`);
            console.log(`  reports   - Clear only HTML reports`);
            console.log(`  size      - Show current results directory size\n`);
    }
}
