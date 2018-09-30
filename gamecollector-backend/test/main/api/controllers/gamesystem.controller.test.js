// gamesystem.controller.test.js

/* global describe, it, before, after */
/* eslint no-shadow: ['error', { 'allow': ['done'] }] */

const path = require('path');

const proxyquire = require('proxyquire').noCallThru();
const supertest = require('supertest');
const { expect } = require('chai');
const should = require('chai').should();
const sinon = require('sinon');

const controllerHelper = require('../../../../api/helpers/controller.helper');
const logHelper = require('../../../../api/helpers/log.helper');
const gamesystemService = require('../../../../api/services/gamesystem.service');
const messageHelper = require('../../../../api/helpers/message.helper');
const expectations = require('../../../expectations/expectations');
const images = require('../../../expectations/images');


const loggerMock = require('../../../mock/helpers/logger.mock');

let mySwaggerExpressBootstrap;

describe('GameSystem Controller Tests', () => {
  let request = null;

  // Needed to define here because gsController is not availabe in inner describes
  // Mocha executes before the describes blocks than the before blocks!!!
  const MODULE_NAME = '[GameSystem Controller]';
  const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';
  const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

  before((done) => {
    mySwaggerExpressBootstrap = proxyquire(
      '../../../../api/bootstrap/swaggerExpress.bootstrap',
      {
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );

    const basePath = path.resolve();
    mySwaggerExpressBootstrap.start(basePath)
      .then(() => {
        logHelper.setTraceLevel('critical');
        request = supertest.agent(mySwaggerExpressBootstrap.server);
        setTimeout(() => { done(); }, 500);
      });
  });

  after((done) => {
    // server.close(done);
    mySwaggerExpressBootstrap.stop();
    done();
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystems
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystems Tests', () => {
    describe('GET /gamesystems Succesfully', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystems').returns(expectations.getGameSystemsExpectation.slice());
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/gamesystems Succesfully', (done) => {
        request
          .get('/api/gamesystems')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectations.getGameSystemsExpectation);
              done();
            }
          });
      });
    });

    describe('GET /api/gamesystems Failed with Exception', () => {
      let myStub;

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(MODULE_NAME, 'getGameSystems');

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystems').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/gamesystems Failed with Exception', (done) => {
        request
          .get('/api/gamesystems')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              res.body.should.eql(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystemById
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystemById Tests', () => {
    describe('GET /api/gamesystems/{id} Succesfully', () => {
      let myStub;

      const gameSystemExpectation = expectations.getGameSystemsExpectation[0];

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').returns(gameSystemExpectation);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/gamesystems/{id} Succesfully', (done) => {
        request
          .get('/api/gamesystems/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(gameSystemExpectation);
              done();
            }
          });
      });
    });

    describe('GET /api/gamesystems/{id} Not Found', () => {
      let myStub;

      const expectedMsg = messageHelper.buildMessage(GS_CT_ERR_GAMESYSTEM_NOT_FOUND);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/gamesystems/{id} Not Found', (done) => {
        request
          .get('/api/gamesystems/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedMsg);
              done();
            }
          });
      });
    });

    describe('GET /api/gamesystems/{id} Failed with Exception', () => {
      let myStub;

      const espectedErrorMsg = controllerHelper.buildErrorResponse(MODULE_NAME, 'getGameSystemById');

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/gamesystems/{id} Failed with Exception', (done) => {
        request
          .get('/api/gamesystems/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(espectedErrorMsg);
              done();
            }
          });
      });
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // // createGameSystem
  // ////////////////////////////////////////////////////////////////////////////////

  describe('createGameSystem Tests', () => {
    describe('POST /api/gamesystems Succesfully', () => {
      let myStub;

      const gamesystemToCreate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const gamesystemToCreateWithId = {
        id: 'EEEE1',
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'createGameSystem').returns(gamesystemToCreateWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/gamesystems Succesfully', (done) => {
        request
          .post('/api/gamesystems')
          .send(gamesystemToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(gamesystemToCreateWithId);
              done();
            }
          });
      });
    });

    describe('POST /api/gamesystems Failed --> There is a gamesystem with the same name in the system', () => {
      let myStub;

      const gamesystemToCreate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const errorMsgSvc = gamesystemService.GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME;
      const resultServiceError = messageHelper.buildErrorMessage(errorMsgSvc);
      const resultControllerMessage = messageHelper.buildMessage(errorMsgSvc);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'createGameSystem').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/gamesystems Failed --> There is a gamesystem with the same name in the system', (done) => {
        request
          .post('/api/gamesystems')
          .send(gamesystemToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(409)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(resultControllerMessage);
              done();
            }
          });
      });
    });

    describe('POST /api/gamesystems Failed with Exception', () => {
      let myStub;

      const gamesystemToCreate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const expErrMsg = controllerHelper.buildErrorResponse(MODULE_NAME, 'createGameSystem');

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'createGameSystem').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/gamesystems Failed with Exception', (done) => {
        request
          .post('/api/gamesystems')
          .send(gamesystemToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expErrMsg);
              done();
            }
          });
      });
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // // updateGameSystem
  // ////////////////////////////////////////////////////////////////////////////////

  describe('updateGameSystem Tests', () => {
    describe('PUT /api/gamesystems Successfully', () => {
      let myStub;

      const idGameSystemToUpdate = 'EEEE1';

      const gamesystemInfoToUpdate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const gamesystemToUpdateWithId = {
        id: 'EEEE1',
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'updateGameSystem').returns(gamesystemToUpdateWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/gamesystems Sucessfully', (done) => {
        request
          .put(`/api/gamesystems/${idGameSystemToUpdate}`)
          .send(gamesystemInfoToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(gamesystemToUpdateWithId);
              done();
            }
          });
      });
    });

    describe('PUT /api/gamesystems Failed', () => {
      let myStub;

      const idGameSystemToUpdate = 'EEEE1';

      const gamesystemInfoToUpdate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const errorMsg = gamesystemService.GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME;
      const resultServiceError = messageHelper.buildErrorMessage(errorMsg);
      const expectedControllerMessage = messageHelper.buildMessage(errorMsg);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'updateGameSystem').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/gamesystems Failed', (done) => {
        request
          .put(`/api/gamesystems/${idGameSystemToUpdate}`)
          .send(gamesystemInfoToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(409)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerMessage);
              done();
            }
          });
      });
    });

    describe('PUT /api/gamesystems Failed with Exception', () => {
      let myStub;

      const idGameSystemToUpdate = 'EEEE1';

      const gamesystemInfoToUpdate = {
        name: 'Sega Master System',
        description: 'A Sega 8 bits console',
        image: images.mastersystemImage,
      };

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(MODULE_NAME, 'updateGameSystem');

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'updateGameSystem').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/gamesystems Failed with Exception', (done) => {
        request
          .put(`/api/gamesystems/${idGameSystemToUpdate}`)
          .send(gamesystemInfoToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // // deleteGameSystem
  // ////////////////////////////////////////////////////////////////////////////////

  describe('deleteGameSystem Tests', () => {
    describe('DELETE /api/gamesystems Sucessfully', () => {
      let myStub;

      const idGamesystemToDelete = 'EEEE1';

      const expMsg = messageHelper.buildMessage(GS_CT_DELETED_SUCCESSFULLY);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'deleteGameSystem').returns(true);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/gamesystems Sucessfully', (done) => {
        request
          .delete(`/api/gamesystems/${idGamesystemToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expMsg);
              done();
            }
          });
      });
    });

    describe('DELETE /api/gamesystems Failed', () => {
      let myStub;

      const idGamesystemToDelete = 'EEEE1';

      const errorMsg = gamesystemService.GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID;
      const resultServiceError = messageHelper.buildErrorMessage(errorMsg);
      const expectedControllerMessage = messageHelper.buildMessage(errorMsg);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'deleteGameSystem').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/gamesystems Failed', (done) => {
        request
          .delete(`/api/gamesystems/${idGamesystemToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerMessage);
              done();
            }
          });
      });
    });

    describe('DELETE /api/gamesystems Failed with Exception', () => {
      let myStub;

      const idGamesystemToDelete = 'EEEE1';

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(MODULE_NAME, 'deleteGameSystem');

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'deleteGameSystem').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/gamesystems Failed', (done) => {
        request
          .delete(`/api/gamesystems/${idGamesystemToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });
  });
});
