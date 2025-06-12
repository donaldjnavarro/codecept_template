const fs = require('fs');
const path = require('path');
const { event, container } = require('codeceptjs');
const os = require('os');
const logger = require('./../utils/logger')

/**
 * Beforeall hook - Runs once per test suite execution
 *
 * Populates the allure report's Environment panel data
 */
let wroteEnv = false;

event.dispatcher.on(event.test.before, async () => {
    // If this has run successfully before, skip it
    if (wroteEnv) return;

    try {
        // If a given test doesn't have browser details (such as an API test) 
        // that is fine, we can throw a warning, but we only need 
        // one test to have a browser to get what we need
        const helper = container.helpers('Playwright');
        if (!helper) return;

        const page = await helper.page;
        if (!page) return;

        const browser = page.context().browser();
        if (!browser) return;

        const browserName = browser.browserType().name();
        const browserVersion = browser.version();

        logger.info('Gathering environment data for Allure report');
        wroteEnv = true;
        const envContent = [
        `browser=${browserName}`,
        `browser.version=${browserVersion}`,
        `os.type=${os.type()}`,
        `os.platform=${os.platform()}`,
        `os.release=${os.release()}`
        ].join('\n');

        const dir = path.join(process.cwd(), 'output', 'allure');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(path.join(dir, 'environment.properties'), envContent);
    } catch (err) {
        logger.error('Could not write environment.properties for Allure:', err);
    }
});


event.dispatcher.on(event.test.finished, function () {
    const allure = container.plugins('allure');

    if (allure && allure.addAttachment) {
        const logPath = path.join(process.cwd(), 'output', 'logs.log');
        if (fs.existsSync(logPath)) {
            const content = fs.readFileSync(logPath, 'utf8');
            allure.addAttachment('Logs', content, 'text/plain');
        }
    }
});
