// videogame.repository.js

/* global describe, it, beforeEach */

const _ = require('lodash');
const { expect } = require('chai');

const expectations = require('../../../expectations/expectations');
const videogameRepository = require('../../../../api/repositories/videogame.repository');

describe('Videogame Repository Tests', () => {
  let numberOfElements;

  // Executes before each Test
  beforeEach(() => {
    // Init default set of videogames
    videogameRepository.initDefaultVideoGames(expectations.getVideoGamesExpectation);
    numberOfElements = videogameRepository.getVideoGames({}).length;
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getVideoGames
  // //////////////////////////////////////////////////////////////////////////////

  describe('getVideoGames Tests', () => {
    it('getVideoGames without filter Successfully', (done) => {
      const result = videogameRepository.getVideoGames({});
      const expectedResult = expectations.getVideoGamesExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames filtering by name Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ name: 'Sonic' });
      const expectedResult = expectations.getVideoGamesExpectation[1];

      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames filtering by developer Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ developer: 'Nintendo' });
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames filtering by gamesystem Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ gamesystem: 'Nintendo NES' });
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames filtering by genre Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ genre: 'Platforms' });
      const expectedResult = expectations.getVideoGamesExpectation;

      expect(result.length).to.equal(2);
      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames filtering by year Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ year: 1985 });
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames sortered by name (ASC) Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ sort: 'name' });
      const expectedResult = _.reverse(expectations.getVideoGamesExpectation.slice());

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames sortered by name (DESC) Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ sort: '-name' });
      const expectedResult = expectations.getVideoGamesExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames sortered by unknown condition Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ sort: 'unknown' });
      const expectedResult = expectations.getVideoGamesExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGames returning a set of specified fields Successfully', (done) => {
      const result = videogameRepository.getVideoGames({ fields: 'id,name,gamesystem,year' });
      // Expected result with only fields filtered
      const expectedResult = expectations.getVideoGamesExpectationReducedFields;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getVideoGameById
  // //////////////////////////////////////////////////////////////////////////////

  describe('getVideoGameById Tests', () => {
    it('getVideoGameById found Successfully', (done) => {
      const firstElementId = expectations.getVideoGamesExpectation[0].id;
      const result = videogameRepository.getVideoGameById(firstElementId);
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGameById not found Successfully', (done) => {
      const result = videogameRepository.getVideoGameById('unknownId');
      const expectedResult = undefined;

      expect(result).to.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getVideoGameByName
  // //////////////////////////////////////////////////////////////////////////////

  describe('getVideoGameByName Tests', () => {
    it('getVideoGameByName found Successfully', (done) => {
      const firstElementName = expectations.getVideoGamesExpectation[0].name;
      const result = videogameRepository.getVideoGameByName(firstElementName);
      const expectedResult = expectations.getVideoGamesExpectation[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getVideoGameByName not found Successfully', (done) => {
      const result = videogameRepository.getVideoGameByName('unknownId');
      const expectedResult = undefined;

      expect(result).to.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // createVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('createVideoGame Tests', () => {
    it('createVideoGame Successfully', (done) => {
      const videogameToCreate = expectations.getOneVideoGameExpectation;

      const result = videogameRepository.createVideoGame(videogameToCreate);
      const expectedResult = videogameToCreate;
      expectedResult.id = result.id;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // updateVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('updateVideoGame Tests', () => {
    it('updateVideoGame not found Successfully', (done) => {
      const videogameToUpdate = expectations.getOneVideoGameExpectation;

      const result = videogameRepository.updateVideoGame(videogameToUpdate);
      const expectedResult = undefined;

      expect(result).to.equal(expectedResult);

      done();
    });

    it('updateVideoGame found Successfully', (done) => {
      const videogameToUpdate = expectations.getVideoGamesExpectation.slice()[0];
      // Change some fields
      videogameToUpdate.year = 1990;
      videogameToUpdate.genre = 'Arcade';

      const result = videogameRepository.updateVideoGame(videogameToUpdate);
      const expectedResult = videogameToUpdate;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // deleteVideoGame
  // //////////////////////////////////////////////////////////////////////////////

  describe('deleteVideoGame Tests', () => {
    it('deleteVideoGame not found Successfully', (done) => {
      const result = videogameRepository.deleteVideoGame('unknownId');
      const videogames = videogameRepository.getVideoGames({});

      expect(videogames.length).to.equal(numberOfElements);
      expect(result).to.deep.equal(false);

      done();
    });

    it('deleteVideoGame found Successfully', (done) => {
      const firstElementId = expectations.getVideoGamesExpectation[0].id;
      const result = videogameRepository.deleteVideoGame(firstElementId);
      const videogames = videogameRepository.getVideoGames({});

      expect(videogames.length).to.equal(numberOfElements - 1);
      expect(result).to.deep.equal(true);

      done();
    });
  });
});
