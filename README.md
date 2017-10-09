## Bit, as simple as it gets.

bit-logger is a dependency package for using a global logger. The logger is an implementation of winston.Logger.

### Install
```
npm install toka-io/bit-logger --save
```

### Example
```
const log = require('bit-logger');

log.info('INFO');
log.warn('WARN');
log.error('ERROR');
```
