// videogame.controller.js

/* global describe, it, before, after */
/* eslint no-shadow: ['error', { 'allow': ['done'] }] */

const path = require('path');

const proxyquire = require('proxyquire').noCallThru();
const supertest = require('supertest');
const { expect } = require('chai');
const should = require('chai').should();
const sinon = require('sinon');

const vgController = require('../../../../api/controllers/videogame.controller');
const controllerHelper = require('../../../../api/helpers/controller.helper');
const vgService = require('../../../../api/services/videogame.service');
const messageHelper = require('../../../../api/helpers/message.helper');
const expectations = require('../../../expectations/expectations');

const loggerMock = require('../../../mock/helpers/logger.mock');

let mySwaggerExpressBootstrap;

describe('VideoGame Controller Tests', () => {
  let request = null;

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
        request = supertest.agent(mySwaggerExpressBootstrap.server);
        setTimeout(() => { done(); }, 500);
      });
  });

  after((done) => {
    // server.close(done);
    mySwaggerExpressBootstrap.stop();
    done();
  });

  //  ////////////////////////////////////////////////////////////////////////////////
  //  // getVideoGames
  //  ////////////////////////////////////////////////////////////////////////////////

  describe('getVideoGames Tests', () => {
    describe('GET /api/videogames Successfully', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGames').returns(expectations.getVideoGamesExpectation.slice());
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/videogames Successfully', (done) => {
        request
          .get('/api/videogames')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectations.getVideoGamesExpectation);
              done();
            }
          });
      });
    });

    describe('GET /api/videogames Failed with Exception', () => {
      let myStub;

      const expErrMsg = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'getVideoGames');

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGames').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/videogames Failed with Exception', (done) => {
        request
          .get('/api/videogames')
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

  //  ////////////////////////////////////////////////////////////////////////////////
  //  // getVideoGameById
  //  ////////////////////////////////////////////////////////////////////////////////

  describe('getVideoGameById Tests', () => {
    describe('GET /api/videogames/{id} Successfully', () => {
      let myStub;

      const videoGameExpectation = expectations.getVideoGamesExpectation[0];

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').returns(videoGameExpectation);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/videogames/{id} Successfully', (done) => {
        request
          .get('/api/videogames/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videoGameExpectation);
              done();
            }
          });
      });
    });

    describe('GET /api/videogames/{id} Failed --> videogame not found', () => {
      let myStub;

      const expErrMsg = messageHelper.buildMessage(vgController.VG_CT_ERR_VIDEOGAME_NOT_FOUND);

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/videogames/{id} Failed --> videogame not found', (done) => {
        request
          .get('/api/videogames/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
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

    describe('GET /api/videogames/{id} Failed with Exception', () => {
      let myStub;

      const expErrMsg = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'getVideoGameById');

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /api/videogames/{id} Failed with Exception', (done) => {
        request
          .get('/api/videogames/AAAA1')
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

  //  ////////////////////////////////////////////////////////////////////////////////
  //  // createVideoGame
  //  ////////////////////////////////////////////////////////////////////////////////

  describe('createVideoGame Tests', () => {
    describe('POST /api/videogames Successfully', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const videogameCreatedWithId = {
        id: 'EEEE1',
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').returns(videogameCreatedWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/videogames Successfully', (done) => {
        request
          .post('/api/videogames')
          .send(videogameToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videogameCreatedWithId);
              done();
            }
          });
      });
    });

    describe('POST /api/videogames Failed --> Exists a videogame with the same name', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const errMessage = vgService.VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME;
      const resultServiceError = messageHelper.buildErrorMessage(errMessage);
      const expectedControllerErrorMessage = messageHelper.buildMessage(errMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/videogames Failed --> Exists a videogame with the same name', (done) => {
        request
          .post('/api/videogames')
          .send(videogameToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
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

    describe('POST /api/videogames Failed with Exception', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'createVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /api/videogames Failed with Exception', (done) => {
        request
          .post('/api/videogames')
          .send(videogameToCreate)
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
  // // updateVideoGame
  // ////////////////////////////////////////////////////////////////////////////////

  describe('updateVideoGame Tests', () => {
    describe('PUT /api/videogames/{id} Successfully', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const videogameToUpdateWithId = {
        id: 'EEEE1',
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').returns(videogameToUpdateWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/videogames/{id} Successfully', (done) => {
        request
          .put(`/api/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videogameToUpdateWithId);
              done();
            }
          });
      });
    });

    describe('PUT /api/videogames/{id} Failed --> videogame not found', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const ErrSvcMessage = vgService.VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND;
      const expErrMsg = messageHelper.buildMessage(ErrSvcMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').returns(messageHelper.buildErrorMessage(vgService.VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/videogames/{id} Failed --> videogame not found', (done) => {
        request
          .put(`/api/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
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

    describe('PUT /api/videogames/{id} Failed with Exception', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'updateVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /api/videogames/{id} Failed with Exception', (done) => {
        request
          .put(`/api/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
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
  // // deleteVideoGame
  // ////////////////////////////////////////////////////////////////////////////////

  describe('deleteVideoGame Tests', () => {
    describe('DELETE /api/videogames/{id} Successfully', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const errMsg = messageHelper.buildMessage(vgController.VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY);

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').returns(true);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/videogames/{id} Successfully', (done) => {
        request
          .delete(`/api/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(errMsg);
              done();
            }
          });
      });
    });

    describe('DELETE /api/videogames/{id} Failed --> Videogame not found', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const errMessage = vgService.VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND;
      const resultServiceError = messageHelper.buildErrorMessage(errMessage);
      const resultControllerMessage = messageHelper.buildMessage(errMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/videogames/{id} Failed --> Videogame not found', (done) => {
        request
          .delete(`/api/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
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

    describe('DELETE /api/videogames/{id} Failed with Exception', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const expectedErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'deleteVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /api/videogames/{id} Failed with Exception', (done) => {
        request
          .delete(`/api/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedErrorMessage);
              done();
            }
          });
      });
    });
  });
});
