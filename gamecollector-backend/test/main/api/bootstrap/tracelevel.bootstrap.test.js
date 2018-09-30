// tracelevel.bootstrap.test.js

/* global describe, it, before */

const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');

const loggerMock = require('../../../mock/helpers/logger.mock');
const configServiceMock = require('../../../mock/services/config.service.mock');

let myTraceLevelBootstrap;

describe('TraceLevel Bootstrap - Tests', () => {
  before(() => {
    myTraceLevelBootstrap = proxyquire(
      '../../../../api/bootstrap/tracelevel.bootstrap',
      {
        '../helpers/log.helper': loggerMock,
        '../services/config.service': configServiceMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('setTraceLevel - Successfully', () => {
    it('setTraceLevel - Successfully', () => {
      // Expected result
      const expectedResult = 'critical';
      // Launch operation
      const result = myTraceLevelBootstrap.setTraceLevel();
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
});
