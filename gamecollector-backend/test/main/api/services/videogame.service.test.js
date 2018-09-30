// videogame.service.js

/* global describe, it, before, after */

const { expect } = require('chai');
const sinon = require('sinon');

const expectations = require('../../../expectations/expectations');
// Main module that we are testing
const videogameService = require('../../../../api/services/videogame.service');
// Secondary modules
const gamesystemService = require('../../../../api/services/gamesystem.service');
const videogameRepository = require('../../../../api/repositories/videogame.repository');
const messageHelper = require('../../../../api/helpers/message.helper');

describe('Videogame Service Tests', () => {
  // //////////////////////////////////////////////////////////////////////////////
  // getVideoGames
  // //////////////////////////////////////////////////////////////////////////////

  describe('getVideoGames Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(videogameRepository, 'getVideoGames').returns(expectations.getVideoGamesExpectation);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getVideoGames Successfully', (done) => {
      const result = videogameService.getVideoGames({});
      const expectedResult = expectations.getVideoGamesExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getVideoGameById
  // //////////////////////////////////////////////////////////////////////////////

  describe('getVideoGameById Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(videogameRepository, 'getVideoGameById').returns(expectations.getVideoGamesExpectation[0]);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getVideoGameById Successfully', (done) => {
      const result = videogameService.getVideoGameById('CCCC1');
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // createVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('createVideoGame Tests', () => {
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

    describe('createVideoGame Succesfully', () => {
      let myStubA;
      let myStubB;
      let myStubC;

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemByName').returns(expectations.getGameSystemsExpectation[0]);
        myStubB = sinon.stub(videogameRepository, 'getVideoGames').returns([]);
        myStubC = sinon.stub(videogameRepository, 'createVideoGame').returns(videogameCreatedWithId);
        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        myStubC.restore();
        done();
      });

      it('createVideoGame Successfully', (done) => {
        const result = videogameService.createVideoGame(videogameToCreate);
        const expectedResult = videogameCreatedWithId;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('createVideoGame Failed --> gamesystem not found', () => {
      let myStub;
      const msgSvcError = videogameService.VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND;
      const jsonMessageResult = messageHelper.buildErrorMessage(msgSvcError);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemByName').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('createVideoGame Failed --> gamesystem not found', (done) => {
        const result = videogameService.createVideoGame(videogameToCreate);
        const expectedResult = jsonMessageResult;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('createVideoGame Failed --> videogame exists for the same gamesystem', () => {
      let myStubA;
      let myStubB;
      const msgSvcError = videogameService.VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME;
      const jsonMessageResult = messageHelper.buildErrorMessage(msgSvcError);

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemByName').returns(expectations.getGameSystemsExpectation[0]);
        myStubB = sinon.stub(videogameRepository, 'getVideoGames').returns(expectations.getGameSystemsExpectation[0]);
        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        done();
      });

      it('createVideoGame Failed --> videogame exists for the same gamesystem', (done) => {
        const result = videogameService.createVideoGame(videogameToCreate);
        const expectedResult = jsonMessageResult;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // updateVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('updateVideoGame Tests', () => {
    describe('updateVideoGame Successfully', () => {
      let myStub;

      const videogameToUpdate = {
        id: 'CCCC1',
        name: 'Super Mario Bros 2',
        developer: 'Nintendo',
        gamesystem: 'Nintendo NES',
        genre: 'Platforms',
        year: 1988,
        image: 'images.superMarioBrosImage',
      };

      before((done) => {
        myStub = sinon.stub(videogameRepository, 'updateVideoGame').returns(videogameToUpdate);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('updateVideoGame Successfully', (done) => {
        const result = videogameService.updateVideoGame(videogameToUpdate);
        const expectedResult = videogameToUpdate;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });


    describe('updateVideoGame Failed --> videogame not found', () => {
      let myStub;

      const videogameToUpdate = {
        id: 'CCCC1',
        name: 'Super Mario Bros 2',
        developer: 'Nintendo',
        gamesystem: 'Nintendo NES',
        genre: 'Platforms',
        year: 1988,
        image: 'images.superMarioBrosImage',
      };

      before((done) => {
        myStub = sinon.stub(videogameRepository, 'updateVideoGame').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('updateVideoGame Failed --> videogame not found', (done) => {
        const result = videogameService.updateVideoGame(videogameToUpdate);
        const msgSvcError = videogameService.VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND;
        const expectedResult = messageHelper.buildErrorMessage(msgSvcError);

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // deleteVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('deleteVideoGame Tests', () => {
    describe('deleteVideoGame Successfully', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(videogameRepository, 'deleteVideoGame').returns(true);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('deleteVideoGame Successfully', (done) => {
        const result = videogameService.deleteVideoGame('CCCC1');
        const expectedResult = true;

        expect(result).to.equal(expectedResult);

        done();
      });
    });

    describe('deleteVideoGame Failed --> videogame not found', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(videogameRepository, 'deleteVideoGame').returns(false);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('deleteVideoGame Failed --> videogame not found', (done) => {
        const result = videogameService.deleteVideoGame('CCCC1');
        const msgSvcError = videogameService.VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND;
        const expectedResult = messageHelper.buildErrorMessage(msgSvcError);

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });
});
