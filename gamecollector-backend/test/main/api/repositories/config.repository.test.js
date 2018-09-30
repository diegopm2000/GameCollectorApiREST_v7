// config.repository.test.js

/* global describe, it */

const { expect } = require('chai');

const myConfigRepository = require('../../../../api/repositories/config.repository');
const expectations = require('../../../expectations/expectations');

describe('ConfigRepository - Tests', () => {
  describe('setConfig & getConfig - Successfully CASE', () => {
    it('setConfig & getConfig - Successfully CASE', () => {
      // Sets config from expectations
      myConfigRepository.setConfig(expectations.config);
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = myConfigRepository.getConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
