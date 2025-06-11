const assert = require('assert');
const logger = require('./../../utils/logger')

Feature('Example API usage');

Scenario('GET requests @api', async ({ I, REST }) => {
    I.haveRequestHeaders({
        'Content-Type': 'application/json'
    });
    const response = await I.sendGetRequest('https://jsonplaceholder.typicode.com/posts/1');

    // Examples of response data schema
    const statusCode = response.status;
    assert.strictEqual(statusCode, 200, 'Expected API status code to be 200');
    
    const statusText = response.statusText;
    assert.strictEqual(statusText, 'OK', 'Expected API status text to be OK');

    const json = response.data;
    assert.strictEqual(typeof json, 'object', 'Expected API response body to be an object')

    logger.info(`Example API request's response: ${JSON.stringify(json)}`);
});
