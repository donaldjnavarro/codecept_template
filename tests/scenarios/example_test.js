const assert = require('assert')
Feature('Example UI tests');

Scenario('Test an example page',  ({ I }) => {
    I.amOnPage('https://example.com');
    I.seeInTitle('Example Domain');
    I.see('More information...')
});
