const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

module.exports = {
  tests: './tests/scenarios/*',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost',
      show: true,
    },
  },
  include: {
    I: './steps_file.js',
  },
  plugins: {
    tryTo: {
      enabled: false,
    },
    retryTo: {
      enabled: false,
    },
  },
  name: 'codecept',
};
