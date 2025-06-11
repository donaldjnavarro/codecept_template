const { createLogger, format, transports } = require('winston');
const FALLBACK_LOG_LEVEL = 'info';


const logger = createLogger({
  level: (process.env.LOG_LEVEL || FALLBACK_LOG_LEVEL).toLowerCase(),
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
