/**
 * Utilities to support logging
 */
const { createLogger, format, transports } = require('winston');
const path = require('path');

const FALLBACK_LOG_LEVEL = 'info';
const LOG_FOLDER = 'output'

/** Create the logger used throughout this suite */
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
    new transports.File({
      filename: path.join(process.cwd(), LOG_FOLDER, 'logs.log'),
      level: 'info',
      maxsize: 5 * 1024 * 1024,  // 5MB max size per file
      maxFiles: 5,               // keep up to 5 rotated files
      tailable: true,
    }),
  ],
});

module.exports = logger;
