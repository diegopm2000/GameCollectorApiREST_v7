// log.helper.test.js

/* global describe, it, before, after */

const { assert } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const LogMock = require('../../../mock/external/LogMock');

let myLogHelper;

describe('LogHelper - Tests', () => {
  before(() => {
    myLogHelper = proxyquire(
      '../../../../api/helpers/log.helper',
      {
        'log-color': LogMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('setTraceLevel - Tests', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogMock, 'spyConstructor');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('setTraceLevel - Successfully', () => {
      // Enter params
      const params = {
        level: 'debug',
        color: true,
      };
      // Launch operation
      myLogHelper.setTraceLevel(params.level);
      assert(mySpy.calledWith(params));
    });
  });

  describe('debug - Tests', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogMock.prototype, 'debug');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('debug - Successfully', () => {
      // Enter params
      const message = 'message';
      // Launch operation
      myLogHelper.debug(message);
      assert(mySpy.calledWith(message));
    });
  });

  describe('info - Tests', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogMock.prototype, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('info - Successfully', () => {
      // Enter params
      const message = 'message';
      // Launch operation
      myLogHelper.info(message);
      assert(mySpy.calledWith(message));
    });
  });

  describe('error - Tests', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogMock.prototype, 'error');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('error - Successfully', () => {
      // Enter params
      const message = 'message';
      // Launch operation
      myLogHelper.error(message);
      assert(mySpy.calledWith(message));
    });
  });
});
