const winston = require('winston');
const config = require('bit-config');
const mkdirp = require('mkdirp');
const path = require('path');

const LOG_DIR = config.get('logDir');

// Enable errors in log
winston.emitErrs = true;

// Create log directory if it doesn't exist
if (!fs.existsSync(LOG_DIR))
  mkdirp.sync(LOG_DIR);

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: LOG_DIR+'/application.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // bytes
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

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};