## Bit, as simple as it gets.

bit-logger is a dependency package for using a global logger. The logger is an implementation of winston.Logger.

### Install
```
npm install toka-io/bit-logger --save
```

### Example
```
const L = require('bit-logger');

L.info('INFO');
L.warn('WARN');
L.error('ERROR');
```
