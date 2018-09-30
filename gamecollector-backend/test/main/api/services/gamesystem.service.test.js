// gamesystem.service.js

/* global describe, it, before, after */

const { expect } = require('chai');
const sinon = require('sinon');

const expectations = require('../../../expectations/expectations');
const images = require('../../../expectations/images');
// Main module that we are testing
const gamesystemService = require('../../../../api/services/gamesystem.service');
// Secondary modules
const videogameService = require('../../../../api/services/videogame.service');
const gamesystemRepository = require('../../../../api/repositories/gamesystem.repository');
const videogameRepository = require('../../../../api/repositories/videogame.repository');
const messageHelper = require('../../../../api/helpers/message.helper');

describe('GameSystem Service Tests', () => {
  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystems
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystems Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(gamesystemRepository, 'getGameSystems').returns(expectations.getGameSystemsExpectation.slice());
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getGameSystems Successfully', (done) => {
      const result = gamesystemService.getGameSystems({});
      const expectedResult = expectations.getGameSystemsExpectation.slice();

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystemById
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystemById Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(gamesystemRepository, 'getGameSystemById').returns(expectations.getGameSystemsExpectation.slice()[0]);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getGameSystemById Successfully', (done) => {
      const result = gamesystemService.getGameSystemById('AAAA1');
      const expectedResult = expectations.getGameSystemsExpectation.slice()[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystemByName
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystemByName Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(gamesystemRepository, 'getGameSystemByName').returns(expectations.getGameSystemsExpectation.slice()[0]);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getGameSystemByName Successfully', (done) => {
      const result = gamesystemService.getGameSystemByName('Nintendo NES');
      const expectedResult = expectations.getGameSystemsExpectation.slice()[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // createGameSystem
  // //////////////////////////////////////////////////////////////////////////////

  describe('createGameSystem Tests', () => {
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

    const msgSvcError = gamesystemService.GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME;
    const errorMessage = messageHelper.buildErrorMessage(msgSvcError);

    describe('createGameSystem Succesfully', () => {
      let myStubA;
      let myStubB;

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemByName').returns(undefined);
        myStubB = sinon.stub(gamesystemRepository, 'createGameSystem').returns(gamesystemToCreateWithId);
        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        done();
      });

      it('createGameSystem Successfully', (done) => {
        const result = gamesystemService.createGameSystem(gamesystemToCreate);
        const expectedResult = gamesystemToCreateWithId;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('createGameSystem Tests Failed -> Object existing with the same name', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemByName').returns(gamesystemToCreateWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('createGameSystem Failed -> Object existing with the same name', (done) => {
        const result = gamesystemService.createGameSystem(gamesystemToCreate);
        const expectedResult = errorMessage;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // updateGameSystem
  // //////////////////////////////////////////////////////////////////////////////

  describe('updateGameSystem Tests', () => {
    const gamesystemOriginal = {
      id: 'AAAA1',
      name: 'Nintendo NES',
      description: 'A Nintendo 8 bits console',
      image: images.nesImage,
    };

    const gamesystemDestination = {
      id: 'AAAA1',
      name: 'Nintendo Super NES',
      description: 'A Nintendo 16 bits console',
      image: images.supernesImage,
    };

    const gamesystemOriginalWithSameName = {
      id: 'FFFF1',
      name: 'Nintendo Super NES',
      description: 'A Nintendo 16 bits console',
      image: images.supernesImage,
    };

    const msgSvcErrorA = gamesystemService.GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME;
    const msgSvcErrorB = gamesystemService.GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID;
    const msgErrorObjWithSameName = messageHelper.buildErrorMessage(msgSvcErrorA);
    const msgErrorObjWithIdNotFound = messageHelper.buildErrorMessage(msgSvcErrorB);

    describe('updateGameSystem Succesfully', () => {
      let myStubA;
      let myStubB;
      let myStubC;

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemById').returns(gamesystemOriginal);
        myStubB = sinon.stub(gamesystemService, 'getGameSystemByName').returns(gamesystemOriginal);
        myStubC = sinon.stub(gamesystemRepository, 'updateGameSystem').returns(gamesystemDestination);

        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        myStubC.restore();
        done();
      });

      it('updateGameSystem Succesfully', (done) => {
        const result = gamesystemService.updateGameSystem(gamesystemDestination);
        const expectedResult = gamesystemDestination;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('updateGameSystem Failed --> Exists a gamesystem with the same name', () => {
      let myStubA;
      let myStubB;

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemById').returns(gamesystemOriginal);
        myStubB = sinon.stub(gamesystemService, 'getGameSystemByName').returns(gamesystemOriginalWithSameName);
        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        done();
      });

      it('updateGameSystem Failed --> Exists a gamesystem with the same name', (done) => {
        const result = gamesystemService.updateGameSystem(gamesystemDestination);
        const expectedResult = msgErrorObjWithSameName;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('updateGameSystem Failed --> Does not exist a gamesystem with the id to update', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('updateGameSystem Failed --> Does not exist a gamesystem with the id to update', (done) => {
        const result = gamesystemService.updateGameSystem(gamesystemDestination);
        const expectedResult = msgErrorObjWithIdNotFound;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // deleteGameSystem
  // //////////////////////////////////////////////////////////////////////////////

  describe('deleteGameSystem Tests', () => {
    describe('deleteGameSystem Succesfully', () => {
      let myStubA;
      let myStubB;
      let myStubC;

      const gamesystemOriginal = {
        id: 'AAAA1',
        name: 'Nintendo NES',
        description: 'A Nintendo 8 bits console',
        image: images.nesImage,
      };

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemById').returns(gamesystemOriginal);
        myStubB = sinon.stub(videogameService, 'getVideoGames').returns([]);
        myStubC = sinon.stub(gamesystemRepository, 'deleteGameSystem').returns(true);

        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        myStubC.restore();
        done();
      });

      it('deleteGameSystem Succesfully', (done) => {
        const result = gamesystemService.deleteGameSystem('AAAA1');
        const expectedResult = true;

        expect(result).to.equal(expectedResult);

        done();
      });
    });

    describe('deleteGameSystem Tests Failed --> GameSystem Not Found', () => {
      let myStub;

      const msgSvcError = gamesystemService.GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID;
      const msgError = messageHelper.buildErrorMessage(msgSvcError);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('deleteGameSystem Failed --> GameSystem Not Found', (done) => {
        const result = gamesystemService.deleteGameSystem('AAAA1');
        const expectedResult = msgError;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('deleteGameSystem Tests Failed --> There are videogames associated to GameSystem', () => {
      let myStub;

      const msgSvcError = gamesystemService.GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED;
      const msgError = messageHelper.buildErrorMessage(msgSvcError);

      before((done) => {
        myStub = sinon.stub(gamesystemService, 'getGameSystemById').returns(expectations.getVideoGamesExpectation.slice());
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('deleteGameSystem Failed --> There are videogames associated to GameSystem', (done) => {
        const result = gamesystemService.deleteGameSystem('AAAA1');
        const expectedResult = msgError;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });

    describe('deleteGameSystem Tests Failed --> GameSystem initally found, but later not found during the deletion', () => {
      let myStubA;
      let myStubB;
      let myStubC;

      const gamesystemOriginal = {
        id: 'AAAA1',
        name: 'Nintendo NES',
        description: 'A Nintendo 8 bits console',
        image: images.nesImage,
      };

      const msgSvcError = gamesystemService.GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID;
      const msgError = messageHelper.buildErrorMessage(msgSvcError);

      before((done) => {
        myStubA = sinon.stub(gamesystemService, 'getGameSystemById').returns(gamesystemOriginal);
        myStubB = sinon.stub(videogameRepository, 'getVideoGames').returns([]);
        myStubC = sinon.stub(gamesystemRepository, 'deleteGameSystem').returns(false);
        done();
      });

      after((done) => {
        myStubA.restore();
        myStubB.restore();
        myStubC.restore();
        done();
      });

      it('deleteGameSystem Failed --> GameSystem initally found, but later not found during the deletion', (done) => {
        const result = gamesystemService.deleteGameSystem('AAAA1');
        const expectedResult = msgError;

        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });
});
