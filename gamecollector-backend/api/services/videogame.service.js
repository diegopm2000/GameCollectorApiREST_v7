// videogame.service.js

const _ = require('lodash');

const gamesystemService = require('../services/gamesystem.service');
const videogameRepository = require('../repositories/videogame.repository');
const messageHelper = require('../helpers/message.helper');
const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Name of the module
const MODULE_NAME = '[Videogame Service]';

// Error Messages
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';
const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found updating a videogame';
const VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found deleting a videogame';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
  log.debug(`${MODULE_NAME}:${getVideoGames.name} (IN) -> params: ${JSON.stringify(params)}`);

  const result = videogameRepository.getVideoGames(params);

  log.debug(`${MODULE_NAME}:${getVideoGames.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function getVideoGameById(id) {
  log.debug(`${MODULE_NAME}:${getVideoGameById.name} (IN) -> id: ${id}`);

  const result = videogameRepository.getVideoGameById(id);

  log.debug(`${MODULE_NAME}:${getVideoGameById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function createVideoGame(params) {
  log.debug(`${MODULE_NAME}:${createVideoGame.name} (IN) -> params: ${JSON.stringify(params)}`);

  let result;
  // Checking if exists the gamesystem by name
  const gamesystemFound = gamesystemService.getGameSystemByName(params.gamesystem);

  if (!_.isUndefined(gamesystemFound)) {
    // Checking if not exists a game for the same gamesystem
    const paramsIN = {
      name: params.name,
      gamesystem: params.gamesystem,
    };
    const videogamesFound = videogameRepository.getVideoGames(paramsIN);

    if (videogamesFound.length === 0) {
      result = videogameRepository.createVideoGame(params);
    } else {
      result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND);
  }

  log.debug(`${MODULE_NAME}:${createVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function updateVideoGame(params) {
  log.debug(`${MODULE_NAME}:${updateVideoGame.name} (IN) -> params: ${JSON.stringify(params)}`);

  let result = videogameRepository.updateVideoGame(params);
  if (_.isUndefined(result)) {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND);
  }

  log.debug(`${MODULE_NAME}:${updateVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function deleteVideoGame(id) {
  log.debug(`${MODULE_NAME}:${deleteVideoGame.name} (IN) -> id: ${id}`);

  let result = false;

  const bDeleted = videogameRepository.deleteVideoGame(id);

  if (bDeleted) {
    result = true;
  } else {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND);
  }

  log.debug(`${MODULE_NAME}:${deleteVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME,
  VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND,
  VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND,
  VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND,
};
