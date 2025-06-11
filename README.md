# CodeceptJS Project

This is a basic starting point for a new CodeceptJS project. It includes the default configuration and dependencies to get started with end-to-end testing.

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run tests:

   ```sh
   npm run test
   ```

> NOTE: Test commands prepared for use in package.json scripts

## Project Structure

- `codecept.conf.js`: Main configuration file for CodeceptJS.
- `tests/scenarios`: Directory for your test files.
- `tests/steps`: Directory for your reusable step files.
- `output`: Directory for screenshots
- `output/allure`: Directory for allure reporter results

For more information, visit [CodeceptJS Documentation](https://codecept.io/).

### Test Reports

We use **Allure** to handle test reports. Its handling is baked into the NodeJS package scripts.

> 🚨 Warning! Every time you run the tests, Rifraf will delete the entire `./output/` folder. So if you need something from your test results, you need to manually move it before running another test.
