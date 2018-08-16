const assert  = require('assert');
const sinon  = require('sinon');
const expect = require('chai').expect;

const L = require('../index.js')();

/**
 * Test winston.Logger methods
 */
describe('bit-logger - INFO output', () => {  
  let spy;

  before(() => {
    spy = sinon.spy(L, 'info');
  });

  it('log.info - Print to INFO successfully', () => {
    L.info('INFO');
    assert(spy.calledWith('INFO'));
  });

  it('log.info - Print to INFO successfully with filler', () => {
   L.info('{}', 'INFO');
   assert(spy.calledWith('INFO'));
 });
});

describe('bit-logger - WARM output', () => {   
  let spy;

  before(() => {
    spy = sinon.spy(L, 'warn');
  });

  it('log.warn - Print to WARN successfully', () => {    
    L.warn('WARN');    
    assert(spy.calledWith('WARN'));
  });
});

describe('bit-logger - ERROR output', () => {    
  let spy;

  before(() => {
    spy = sinon.spy(L, 'error');
  });

  it('log.error - Print to ERROR successfully', () => {
    L.error('ERROR');    
    assert(spy.calledWith('ERROR'));
  });
});