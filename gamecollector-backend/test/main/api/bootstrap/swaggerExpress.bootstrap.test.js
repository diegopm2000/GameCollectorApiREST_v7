// swaggerExpress.bootstrap.test.js

/* global describe, it, before, after */

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const { assert, expect } = require('chai');

const request = require('supertest');

const path = require('path');

const SwaggerExpress = require('swagger-express-mw');

const loggerMock = require('../../../mock/helpers/logger.mock');

let mySwaggerExpressBootstrap;

describe('SwaggerExpress Bootstrap - Tests', () => {
  before(() => {
    mySwaggerExpressBootstrap = proxyquire(
      '../../../../api/bootstrap/swaggerExpress.bootstrap',
      {
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('start - Successfully', () => {
    it('start - Successfully', (done) => {
      // IN params
      const appRoot = path.resolve('./');
      const port = 8081;
      // Expected result
      const expectedResult = true;
      // Launch operation
      mySwaggerExpressBootstrap.start(appRoot, port)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            mySwaggerExpressBootstrap.stop();
            // console.log('Fin del primer test SwaggerExpress');
            done();
          }, 500);
        });
    });

    it('start - Successfully, default port CASE', (done) => {
      // IN params
      const appRoot = path.resolve('./');
      // Expected result
      const expectedResult = true;
      // Launch operation
      mySwaggerExpressBootstrap.start(appRoot)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            mySwaggerExpressBootstrap.stop();
            // console.log('Fin del segundo test SwaggerExpress');
            done();
          }, 500);
        });
    });
  });

  describe('start - Throwing Exception CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(SwaggerExpress, 'create').yields('Forced error in testing');
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('start - Throwing Exception CASE', (done) => {
      // IN params
      const appRoot = path.resolve('./');
      const port = 8082;
      // Expected result
      const msgErrorExpected = 'Express did not start correctly!';
      // Launch operation

      mySwaggerExpressBootstrap.start(appRoot, port)
        .then(() => {
          // Calling Stop Server
          setTimeout(() => {
            mySwaggerExpressBootstrap.stop();
            done(new Error('Exception need to be launched!'));
          }, 500);
        })
        .catch(((error) => {
          // Check
          expect(error.message).to.equal(msgErrorExpected);
          // Calling Stop Server
          setTimeout(() => {
            mySwaggerExpressBootstrap.stop();
            // console.log('Fin del tercer test SwaggerExpress');
            done();
          }, 500);
        }));
    });
  });

  describe('start - Trying the healthcheck CASE', () => {
    it('start - Trying the healthcheck CASE', (done) => {
      // IN params
      const appRoot = path.resolve('./');
      const port = 8083;
      // Launch operation
      mySwaggerExpressBootstrap.start(appRoot, port)
        .then(() => {
          setTimeout(() => {
            const supertest = request(mySwaggerExpressBootstrap.server);

            supertest
              .get('/healthcheck')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) {
                  // console.log('Nos vamos por ERROR en el cuarto test');
                  assert(false);
                } else {
                  const expectedResult = {
                    everything: 'is ok',
                  };
                  expect(res.body).to.deep.equal(expectedResult);
                  // Calling Stop Server
                  setTimeout(() => {
                    mySwaggerExpressBootstrap.stop();
                    // console.log('Fin del cuarto test SwaggerExpress');
                    done();
                  }, 500);
                }
              });
          }, 500);
        });
    });
  });
});
