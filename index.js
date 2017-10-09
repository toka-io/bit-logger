const winston = require('winston');
const config = require('bit-config');
winston.emitErrs = true;

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: config.get('logDir')+'/application.log',
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