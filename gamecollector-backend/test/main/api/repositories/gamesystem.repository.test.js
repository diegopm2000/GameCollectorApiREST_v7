// gamesystem.repository.js

/* global describe, it, beforeEach */

const _ = require('lodash');
const { expect } = require('chai');

const expectations = require('../../../expectations/expectations');
// const images = require('../expectations/images');
const gsRepository = require('../../../../api/repositories/gamesystem.repository');

describe('GameSystem Repository Tests', () => {
  let numberOfElements;

  // Executes before each Test
  beforeEach(() => {
    // Init default set of gamesystems
    gsRepository.initDefaultGameSystems(expectations.getGameSystemsExpectation);
    numberOfElements = gsRepository.getGameSystems({}).length;
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystems
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystems Tests', () => {
    it('getGameSystems without filter Successfully', (done) => {
      const result = gsRepository.getGameSystems({});
      const expectedResult = expectations.getGameSystemsExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getGameSystems filtering by name Successfully', (done) => {
      const result = gsRepository.getGameSystems({ name: 'Nintendo NES' });
      const expectedResult = expectations.getGameSystemsExpectation[0];

      expect(result.length).to.equal(1);
      expect(result[0]).to.deep.equal(expectedResult);

      done();
    });

    it('getGameSystems sortered by name (ASC) Successfully', (done) => {
      const result = gsRepository.getGameSystems({ sort: 'name' });
      const expectedResult = expectations.getGameSystemsExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getGameSystems sortered by name (DESC) Successfully', (done) => {
      const result = gsRepository.getGameSystems({ sort: '-name' });
      const expectedResult = _.reverse(expectations.getGameSystemsExpectation);

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getGameSystems sortered by unknown condition Successfully', (done) => {
      const result = gsRepository.getGameSystems({ sort: 'unknown' });
      const expectedResult = expectations.getGameSystemsExpectation;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // getGameSystemById
  // //////////////////////////////////////////////////////////////////////////////

  describe('getGameSystemById Tests', () => {
    it('getGameSystemById found Successfully', (done) => {
      const result = gsRepository.getGameSystemById(expectations.getGameSystemsExpectation[0].id);
      const expectedResult = expectations.getGameSystemsExpectation[0];

      expect(result).to.equal(expectedResult);

      done();
    });

    it('getGameSystemById not found Successfully', (done) => {
      const result = gsRepository.getGameSystemById('unknownId');

      expect(result).to.equal(undefined);

      done();
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // getGameSystemByName
  // ////////////////////////////////////////////////////////////////////////////////

  describe('getGameSystemByName Tests', () => {
    it('getGameSystemByName found Successfully', (done) => {
      const firstElementName = expectations.getGameSystemsExpectation[0].name;
      const result = gsRepository.getGameSystemByName(firstElementName);
      const expectedResult = expectations.getGameSystemsExpectation[0];

      expect(result).to.deep.equal(expectedResult);

      done();
    });

    it('getGameSystemByName not found Successfully', (done) => {
      const result = gsRepository.getGameSystemByName('unknownName');

      expect(result).to.equal(undefined);

      done();
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // createGameSystem
  // ////////////////////////////////////////////////////////////////////////////////

  describe('createGameSystem Tests', () => {
    it('createGameSystem Successfully', (done) => {
      const gamesystemToCreate = expectations.getOneGameSystemExpectationWithoutId;

      const result = gsRepository.createGameSystem(gamesystemToCreate);
      const expectedResult = gamesystemToCreate;
      expectedResult.id = result.id;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // updateGameSystem
  // ////////////////////////////////////////////////////////////////////////////////

  describe('updateGameSystem Tests', () => {
    it('updateGameSystem not found Successfully', (done) => {
      const gamesystemToUpdate = expectations.getOneGameSystemExpectation;

      const result = gsRepository.updateGameSystem(gamesystemToUpdate);

      expect(result).to.equal(undefined);

      done();
    });

    it('updateGameSystem found Successfully', (done) => {
      const gamesystemToUpdate = expectations.getOneGameSystemExpectation;
      // Sets id to an existing id in the gamesystems list
      gamesystemToUpdate.id = 'AAAA1';

      const result = gsRepository.updateGameSystem(gamesystemToUpdate);
      const expectedResult = gamesystemToUpdate;

      expect(result).to.deep.equal(expectedResult);

      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////////
  // deleteGameSystem
  // //////////////////////////////////////////////////////////////////////////////

  describe('deleteGameSystem Tests', () => {
    it('deleteGameSystem not found Successfully', (done) => {
      const result = gsRepository.deleteGameSystem('unknownId');
      const gamesystems = gsRepository.getGameSystems({});

      expect(gamesystems.length).to.equal(numberOfElements);
      expect(result).to.deep.equal(false);

      done();
    });

    it('deleteGameSystem found Successfully', (done) => {
      const result = gsRepository.deleteGameSystem(expectations.getGameSystemsExpectation[0].id);
      const gamesystems = gsRepository.getGameSystems({});

      expect(gamesystems.length).to.equal(numberOfElements - 1);
      expect(result).to.deep.equal(true);

      done();
    });
  });
});
