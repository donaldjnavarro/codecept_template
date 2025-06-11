const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/scenarios/*',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: true,
      browser: 'chromium',
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
  name: 'codecept',
};
