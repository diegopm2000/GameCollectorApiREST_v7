// gamesystem.service.js

const _ = require('lodash');

const log = require('../helpers/log.helper');
const videogameRepository = require('../repositories/videogame.repository');
const gamesystemRepository = require('../repositories/gamesystem.repository');
const messageHelper = require('../helpers/message.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Name of the module
const MODULE_NAME = '[GameSystem Service]';

// Error Messages
const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create gamesystem. There is a gamesystem with the same name in the system';
const GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to update gamesystem. There is a gamesystem with the same name to update in the system';
const GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID = 'Not possible to update gamesystem. There is NOT a gamesystem with the same id to update';
const GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID = 'Not possible to delete gamesystem. Gamesystem not found';
const GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED = 'Not possible to delete gamesystem. There are videogames associated with the gamesystem';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getGameSystems(params) {
  log.debug(`${MODULE_NAME}:${getGameSystems.name} (IN) -> params: ${JSON.stringify(params)}`);

  const result = gamesystemRepository.getGameSystems(params);

  log.debug(`${MODULE_NAME}:${getGameSystems.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function getGameSystemById(id) {
  log.debug(`${MODULE_NAME}:${getGameSystemById.name} (IN) -> id: ${id}`);

  const result = gamesystemRepository.getGameSystemById(id);

  log.debug(`${MODULE_NAME}:${getGameSystemById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function getGameSystemByName(name) {
  log.debug(`${MODULE_NAME}:${getGameSystemByName.name} (IN) -> name: ${name}`);

  const result = gamesystemRepository.getGameSystemByName(name);

  log.debug(`${MODULE_NAME}:${getGameSystemByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function createGameSystem(params) {
  log.debug(`${MODULE_NAME}:${createGameSystem.name} (IN) -> params: ${JSON.stringify(params)}`);

  let result;

  // Checks if exists a gamesystem with the same name - Using module.exports
  // to call the function to ease the testing
  const gamesystemFound = module.exports.getGameSystemByName(params.name);

  if (_.isUndefined(gamesystemFound)) {
    result = gamesystemRepository.createGameSystem(params);
  } else {
    result = messageHelper.buildErrorMessage(GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);
  }

  log.debug(`${MODULE_NAME}:${createGameSystem.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function updateGameSystem(params) {
  log.debug(`${MODULE_NAME}:${updateGameSystem.name} (IN) -> params: ${JSON.stringify(params)}`);

  let result;

  // Checks if exists a gamesystem with the same id - Using module.exports
  // to call the function to ease the testing
  const gamesystemFoundById = module.exports.getGameSystemById(params.id);
  if (!_.isUndefined(gamesystemFoundById)) {
    // Then checks if exists a gamesystem with the same name.
    // If exists, the id must be the same that the object in params
    const gamesystemFoundByName = module.exports.getGameSystemByName(params.name);

    if (_.isUndefined(gamesystemFoundByName) || gamesystemFoundByName.id === params.id) {
      result = gamesystemRepository.updateGameSystem(params);
    } else {
      result = messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID);
  }

  log.debug(`${MODULE_NAME}:${updateGameSystem.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function deleteGameSystem(id) {
  log.debug(`${MODULE_NAME}:${deleteGameSystem.name} (IN) -> id: ${id}`);

  let result;

  // First obtains the game system
  const myGameSystem = module.exports.getGameSystemById(id);

  if (!_.isUndefined(myGameSystem)) {
    const filterParams = { gamesystem: myGameSystem.name };
    const games = videogameRepository.getVideoGames(filterParams);

    if (!_.isUndefined(games) && games.length > 0) {
      result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED);
    } else {
      const resultDeletion = gamesystemRepository.deleteGameSystem(id);
      if (resultDeletion) {
        result = true;
      } else {
        result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID);
      }
    }
  } else {
    result = messageHelper.buildErrorMessage(GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID);
  }

  log.debug(`${MODULE_NAME}:${deleteGameSystem.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getGameSystems,
  getGameSystemById,
  getGameSystemByName,
  createGameSystem,
  updateGameSystem,
  deleteGameSystem,
  GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED,
};
