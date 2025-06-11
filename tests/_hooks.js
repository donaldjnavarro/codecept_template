const fs = require('fs');
const path = require('path');
const { event, container } = require('codeceptjs');

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
