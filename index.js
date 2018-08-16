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

/**
 * This logger is a wrapper around winston. It gives the additional feature of setting {} placeholders 
 * in the log string to make it easier for string interpolation
 */
const bitLogger = () => {
  return {
    info: (message, ...fillers) => {
      if (fillers.length > 0) 
        fillers.map(filler => message = message.replace("{}", filler));
      logger.info(message);
    },
    debug: (message, ...fillers) => {
      if (fillers.length > 0) 
        fillers.map(filler => message = message.replace("{}", filler));
      logger.debug(message);
    },
    warn: (message, ...fillers) => {
      if (fillers.length > 0) 
        fillers.map(filler => message = message.replace("{}", filler));
      logger.warn(message);
    },
    error: (message, ...fillers) => {
      if (fillers.length > 0) 
        fillers.map(filler => message = message.replace("{}", filler));
      logger.error(message);
    }
  };
}

module.exports = bitLogger;
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};