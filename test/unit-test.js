const assert  = require('assert');
const sinon  = require('sinon');
const expect = require('chai').expect;
const log = require('../index.js');

/**
 * Test winston.Logger methods
 */
describe('bit-logger', () => {
  it('log.info - Print to INFO successfully', () => {
     // "spy" on `log.info()` 
    let spy = sinon.spy(log, 'info');
    
    log.info('INFO');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('INFO'));
  });
  
  it('log.warn - Print to WARN successfully', () => {
    // "spy" on `log.warn()` 
    let spy = sinon.spy(log, 'warn');
    
    log.warn('WARN');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('WARN'));
  });
  
  it('log.error - Print to ERROR successfully', () => {
    // "spy" on `log.error()` 
    let spy = sinon.spy(log, 'error');
    
    log.error('ERROR');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('ERROR'));
  });
});