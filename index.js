const winston = require('winston');
const config = require('bit-config');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const LOG_DIR = config.get('logging.directory');
const LOG_LEVEL = config.get('logging.level');
const MAX_SIZE = config.get('logging.maxsize');

// Enable errors in log
winston.emitErrs = true;

// Create log directory if it doesn't exist
if (!fs.existsSync(LOG_DIR))
  mkdirp.sync(LOG_DIR);

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: (LOG_LEVEL) ? LOG_LEVEL : 'info',
      filename: (LOG_DIR) ? LOG_DIR +'/application.log' : 'var/output/application.log',
      handleExceptions: true,
      json: true,
      maxsize: (MAX_SIZE) ? MAX_SIZE : 5242880, // bytes
      maxFiles: 1, // number of files
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

const bitLogger = (p) => {
  const prefix = (p) ? p : '';
  const wrapper = {
    info: (message) => {
      logger.info(prefix + ' ' +  message);
    },
    debug: (message) => {
      logger.debug(prefix + ' ' +  message);
    },
    warn: (message) => {
      logger.warn(prefix + ' ' +  message);
    },
    error: (message) => {
      logger.error(prefix + ' ' +  message);
    }
  };

  return wrapper;
}

module.exports = bitLogger;
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};