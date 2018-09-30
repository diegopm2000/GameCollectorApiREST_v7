// app.test.js

/* global describe, it, before, after */

const { assert, expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const loggerMock = require('../mock/helpers/logger.mock');
const expressBootstrapMock = require('../mock/bootstrap/swaggerExpress.bootstrap.mock');
const configBootstrapMock = require('../mock/bootstrap/config.bootstrap.mock');
const traceLevelBootstrapMock = require('../mock/bootstrap/tracelevel.bootstrap.mock');
const dcConnectionBootstrapMock = require('../mock/bootstrap/dbconnection.bootstrap');

let myApp;

describe('Main App - Tests', () => {
  before(() => {
  });

  describe('load module - Successfully', () => {
    it('load module - Successfully', (done) => {
      // Here, the app starts, executing init automatically!!!
      myApp = proxyquire(
        '../../app',
        {
          './api/helpers/log.helper': loggerMock,
          './api/bootstrap/swaggerExpress.bootstrap': expressBootstrapMock,
          './api/bootstrap/config.bootstrap': configBootstrapMock,
          './api/bootstrap/tracelevel.bootstrap': traceLevelBootstrapMock,
          './api/bootstrap/dbconnection.bootstrap': dcConnectionBootstrapMock,
        } // eslint-disable-line comma-dangle
      ); // eslint-disable-line global-require

      setTimeout(() => {
        assert(true);
      }, 200);
      // Calling Stop
      setTimeout(() => {
        myApp.stop();
        done();
      }, 400);
    });
  });
  describe('init - Successfully CASE', () => {
    it('init - Successfully CASE', async () => {
      // Expected
      const expectedResult = true;
      // Launch op
      const result = await myApp.init();
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
  describe('init - throwing Error CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(configBootstrapMock, 'initAppConfig').rejects(new Error('Error forced in testing'));
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });
    it('init - throwing Error CASE', async () => {
      // Expected
      const expectedResult = false;
      // Launch op
      const result = await myApp.init();
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
});
