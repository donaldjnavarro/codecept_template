const { setHeadlessWhen } = require('@codeceptjs/configure');
require('dotenv').config();

/** Headless configs */
const headless = (process.env.HEADLESS || '').toLowerCase() === 'true';
// This is redundant for Playwright with the 'show' setting below,
// but theoretically this configuration helper is more universal
// when pivoting to use to other automation frameworks
setHeadlessWhen(headless);

/** Browser configs */
const supportedBrowsers = ['chromium', 'firefox', 'webkit'];
const selectedBrowser = (process.env.BROWSER || '').toLowerCase();
if (!supportedBrowsers.includes(selectedBrowser)) {
    throw new Error(`Invalid BROWSER value in .env. Must be one of: ${supportedBrowsers.join(', ')}`);
}

/** Full config */
exports.config = {
    tests: './tests/scenarios/*',
    output: './output',
    helpers: {
        Playwright: {
            url: 'http://localhost',
            browser: selectedBrowser,
            show: !headless
        },
        REST: {
            endpoint: 'https://api.example.com',
        },
    },
    include: {
        I: './tests/steps/steps_file.js',
    },
    plugins: {
        tryTo: {
            enabled: false,
        },
        retryTo: {
            enabled: false,
        },
        allure: {
            enabled: true,
            require: '@codeceptjs/allure-legacy',
            outputDir: './output/allure',
        }
    },
    require: [
        './tests/_hooks.js'
    ],
    name: 'codecept',
};
