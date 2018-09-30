// config.bootstrap.test.js

/* global describe, it, before */

const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');

const expectations = require('../../../expectations/expectations');

const loggerMock = require('../../../mock/helpers/logger.mock');
const configServiceMock = require('../../../mock/services/config.service.mock');

let myConfigBootstrap;

describe('Config Bootstrap - Tests', () => {
  before(() => {
    myConfigBootstrap = proxyquire(
      '../../../../api/bootstrap/config.bootstrap',
      {
        '../helpers/log.helper': loggerMock,
        '../services/config.service': configServiceMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('initAppConfig - Successfully', () => {
    it('initAppConfig - Successfully', async () => {
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigBootstrap.initAppConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
