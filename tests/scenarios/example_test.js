const assert = require('assert')
Feature('example');

Scenario('test something',  ({ I }) => {
    I.amOnPage('https://example.com');
    assert.fail()
});
