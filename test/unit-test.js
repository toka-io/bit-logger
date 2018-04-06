const assert  = require('assert');
const sinon  = require('sinon');
const expect = require('chai').expect;
const L = require('../index.js')();
const LwithPrefix = require('../index.js').bind(null, '[requestId]')();

/**
 * Test winston.Logger methods
 */
describe('bit-logger', () => {
  it('log.info - Print to INFO successfully', () => {
     // "spy" on `log.info()` 
    let spy = sinon.spy(L, 'info');
    
    L.info('INFO');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('INFO'));
  });

  it('log.info - Print to INFO successfully with prefix', () => {
    // "spy" on `log.info()` with prefix
    // spy does not work with bind
   let spy = sinon.spy(LwithPrefix, 'info');
   
   LwithPrefix.info('INFO');
   
   // assert that it was called with the correct value
   assert(spy.calledWith('INFO'));
 });
  
  it('log.warn - Print to WARN successfully', () => {
    // "spy" on `log.warn()` 
    let spy = sinon.spy(L, 'warn');
    
    L.warn('WARN');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('WARN'));
  });
  
  it('log.error - Print to ERROR successfully', () => {
    // "spy" on `log.error()` 
    let spy = sinon.spy(L, 'error');
    
    L.error('ERROR');
    
    // assert that it was called with the correct value
    assert(spy.calledWith('ERROR'));
  });
});