import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Playwright Test Runner - Utility to run tests with various options
 * Usage: npx ts-node runner.ts [command] [options]
 */

interface RunnerOptions {
  browser?: 'chromium' | 'firefox' | 'webkit' | 'all';
  headless?: boolean;
  testFile?: string;
  grep?: string;
  debug?: boolean;
  report?: boolean;
  workers?: number;
}

class TestRunner {
  private options: RunnerOptions = {};

  constructor() {
    this.parseArgs();
  }

  private parseArgs() {
    const args = process.argv.slice(2);
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--browser' && args[i + 1]) {
        this.options.browser = args[++i] as any;
      } else if (arg === '--headless') {
        this.options.headless = true;
      } else if (arg === '--headed') {
        this.options.headless = false;
      } else if (arg === '--test' && args[i + 1]) {
        this.options.testFile = args[++i];
      } else if (arg === '--grep' && args[i + 1]) {
        this.options.grep = args[++i];
      } else if (arg === '--debug') {
        this.options.debug = true;
      } else if (arg === '--report') {
        this.options.report = true;
      } else if (arg === '--workers' && args[i + 1]) {
        this.options.workers = parseInt(args[++i]);
      } else if (arg === '--help' || arg === '-h') {
        this.showHelp();
        process.exit(0);
      }
    }
  }

  private showHelp() {
    console.log(`
Playwright Test Runner

Usage: npx ts-node runner.ts [command] [options]

Commands:
  run                   Run all tests (default)
  list                  List all available tests
  report                Open HTML report
  help                  Show this help message

Options:
  --browser <name>      Browser to run tests on (chromium|firefox|webkit|all)
                        Default: all
  --test <pattern>      Run specific test file pattern
                        Example: --test demand_e2e.spec.ts
  --grep <pattern>      Filter tests by name pattern
                        Example: --grep "create corporate"
  --headless            Run in headless mode (no GUI)
  --headed              Run in headed mode (with GUI)
  --workers <num>       Number of parallel workers
  --debug               Run in debug mode (opens inspector)
  --report              Open HTML report after run
  -h, --help            Show this help message

Examples:
  npx ts-node runner.ts run
  npx ts-node runner.ts run --browser chromium
  npx ts-node runner.ts run --test demand_e2e.spec.ts --headless
  npx ts-node runner.ts run --grep "create corporate" --browser firefox
  npx ts-node runner.ts list
  npx ts-node runner.ts report
    `);
  }

  private listTests() {
    console.log('\n📋 Available test files:\n');
    const testsDir = path.join(process.cwd(), 'tests');
    
    if (!fs.existsSync(testsDir)) {
      console.log('No tests directory found.');
      return;
    }

    const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.spec.ts'));
    
    if (files.length === 0) {
      console.log('No test files found.');
      return;
    }

    files.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file}`);
    });
    console.log('');
  }

  private openReport() {
    const reportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    
    if (!fs.existsSync(reportPath)) {
      console.log('❌ Report not found at:', reportPath);
      console.log('Run tests first to generate a report.');
      return;
    }

    try {
      const command = process.platform === 'win32' 
        ? `start "${reportPath}"`
        : process.platform === 'darwin'
        ? `open "${reportPath}"`
        : `xdg-open "${reportPath}"`;
      
      execSync(command, { stdio: 'inherit' });
      console.log('✓ Report opened in browser');
    } catch (error) {
      console.log('Could not open report automatically. Open manually:', reportPath);
    }
  }

  private buildCommand(): string {
    let cmd = 'npx playwright test';

    // Add test file if specified
    if (this.options.testFile) {
      cmd += ` tests/${this.options.testFile}`;
    }

    // Add grep filter if specified
    if (this.options.grep) {
      cmd += ` --grep "${this.options.grep}"`;
    }

    // Add browser selection
    if (this.options.browser && this.options.browser !== 'all') {
      cmd += ` --project=${this.options.browser}`;
    }

    // Add workers
    if (this.options.workers) {
      cmd += ` --workers=${this.options.workers}`;
    }

    // Add headless option
    if (this.options.headless !== undefined) {
      // Playwright doesn't have a direct --headless flag, but we can use env vars
      // This would require modifying playwright.config.ts to read from env
    }

    // Add debug mode
    if (this.options.debug) {
      cmd += ' --debug';
    }

    return cmd;
  }

  public async run(command?: string) {
    const cmd = command || process.argv[2] || 'run';

    switch (cmd) {
      case 'list':
        this.listTests();
        break;

      case 'report':
        this.openReport();
        break;

      case 'help':
      case '-h':
        this.showHelp();
        break;

      case 'run':
      default:
        await this.runTests();
        break;
    }
  }

  private async runTests() {
    console.log('🎭 Starting Playwright tests...\n');
    
    const command = this.buildCommand();
    console.log(`Command: ${command}\n`);

    try {
      execSync(command, { stdio: 'inherit' });
      console.log('\n✓ Tests completed');

      // Automatically open report if flag was set
      if (this.options.report) {
        console.log('Opening report...');
        this.openReport();
      }
    } catch (error) {
      console.error('\n❌ Tests failed');
      process.exit(1);
    }
  }
}

// Run the test runner
const runner = new TestRunner();
runner.run();
