const logger = require('./../../utils/logger')

module.exports = function() {
    logger.info('Loading the steps file')
    return actor({

        // Define custom steps here, use 'this' to access default methods of I.
        // It is recommended to place a general 'login' function here.

    });
}
