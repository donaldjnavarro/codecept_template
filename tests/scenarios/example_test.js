Feature('Example UI tests');

Scenario('Test an example page', ({ I }) => {
    I.amOnPage('https://example.com');
    I.seeInTitle('Example Domain');
    I.see('This domain is for use in documentation examples without needing permission.')
});
