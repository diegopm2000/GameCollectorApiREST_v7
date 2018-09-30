// config.service.test.js

/* global describe, it, before, after */

const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const sinon = require('sinon');

const rp = require('request-promise');

const loggerMock = require('../../../mock/helpers/logger.mock');
const readYamlMock = require('../../../mock/external/readYamlPromiseMock');

const expectations = require('../../../expectations/expectations');

let myConfigService;

describe('ConfigService - Tests', () => {
  before(() => {
    myConfigService = proxyquire(
      '../../../../api/services/config.service',
      {
        'read-yaml-promise': readYamlMock,
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('loadConfigFromYmlFile - Successfully CASE', () => {
    it('loadConfigFromYmlFile - Successfully CASE', async () => {
      // IN params
      const file = 'defaultfile.yml';
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigService.loadConfigFromYmlFile(file);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });

  describe('loadConfigFromGIT - Successfully CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(rp, 'get').resolves(expectations.config);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('loadConfigFromGIT - Successfully CASE', async () => {
      // IN params
      const file = 'defaultfile.yml';
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigService.loadConfigFromGIT(file);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });

  describe('loadConfig - GIT SOURCE Successfully CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(rp, 'get').resolves(expectations.config);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('loadConfig - GIT SOURCE Successfully CASE', async () => {
      // IN params
      const options = {
        source: myConfigService.GIT_SOURCE,
        file: 'defaultfile.yml',
        gituri: 'http://localhost:8888',
      };
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigService.loadConfig(options);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });

  describe('loadConfig - YML FILE SOURCE Successfully CASE', () => {
    it('loadConfig - YML FILE SOURCE Successfully CASE', async () => {
      // IN params
      const options = {
        source: myConfigService.YAML_FILE_SOURCE,
        file: 'defaultfile.yml',
      };
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigService.loadConfig(options);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });

  describe('loadConfig - Source not valid CASE', () => {
    it('loadConfig - Source not valid CASE', async () => {
      // IN params
      const options = {
        source: 'ANOTHER SOURCE NOT VALID',
        file: 'defaultfile.yml',
      };
      // Expected result
      const expectedMsgError = myConfigService.ERROR_SOURCE_NOT_VALID;
      // Launch operation
      try {
        await myConfigService.loadConfig(options);
      } catch (error) {
        // Check
        expect(error.message).to.equal(expectedMsgError);
      }
    });
  });

  describe('updateConfig - Successfully CASE', () => {
    it('updateConfig -Successfully CASE', async () => {
      // IN params
      const options = {
        source: myConfigService.YAML_FILE_SOURCE,
        file: 'defaultfile.yml',
      };
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await myConfigService.updateConfig(options);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });

  describe('setConfig & getConfig - Successfully CASE', () => {
    it('setConfig & getConfig - Successfully CASE', () => {
      // Sets config from expectations
      myConfigService.setConfig(expectations.config);
      // Expected result
      const expectedResult = expectations.config;
      // Launch operation
      const result = myConfigService.getConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
