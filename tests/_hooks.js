const fs = require('fs');
const path = require('path');
const { event, container } = require('codeceptjs');
const os = require('os');

/**
 * Beforeall hook - Runs once per test suite execution
 *
 * Populates the allure report's Environment panel data
 */
event.dispatcher.on(event.suite.before, async () => {
    try {
        // Collect the data to include as environment data
        const helper = container.helpers('Playwright');
        const browser = helper.browserContext.browser();
        const browserName = browser.browserType().name();
        const browserVersion = browser.version();
        const envContent = [
            `browser=${browserName}`,
            `browser.version=${browserVersion}`,
            `os.type=${os.type()}`,
            `os.platform=${os.platform()}`,
            `os.release=${os.release()}`,
        ].join('\n');

        // Directory of the raw allure results
        const allureResultsDir = path.join(process.cwd(), 'output', 'allure');

        // Create the directory if needed
        if (!fs.existsSync(allureResultsDir)) {
            fs.mkdirSync(allureResultsDir, { recursive: true });
        }

        // Save a file of the environment properties
        const envFile = path.join(allureResultsDir, 'environment.properties');
        fs.writeFileSync(envFile, envContent);
    } catch (err) {
        console.error('Could not write environment.properties for Allure:', err);
    }
});

event.dispatcher.on(event.test.finished, function (test) {
    const allure = container.plugins('allure');

    if (allure && allure.addAttachment) {
        const logPath = path.join(process.cwd(), 'output', 'logs.log');
        if (fs.existsSync(logPath)) {
            const content = fs.readFileSync(logPath, 'utf8');
            allure.addAttachment('Logs', content, 'text/plain');
        }
    }
});
