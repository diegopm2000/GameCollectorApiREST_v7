// videogame.service.js

const _ = require('lodash');

const gamesystemService = require('../services/gamesystem.service');
const videogameRepository = require('../repositories/videogame.repository');
const messageHelper = require('../helpers/message.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Error Messages
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';
const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found updating a videogame';
const VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found deleting a videogame';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
  const result = videogameRepository.getVideoGames(params);
  return result;
}

function getVideoGameById(id) {
  const result = videogameRepository.getVideoGameById(id);
  return result;
}

function createVideoGame(params) {
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
  return result;
}

function updateVideoGame(params) {
  let result = videogameRepository.updateVideoGame(params);
  if (_.isUndefined(result)) {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND);
  }
  return result;
}

function deleteVideoGame(id) {
  const bDeleted = videogameRepository.deleteVideoGame(id);

  if (bDeleted) {
    return true;
  }

  return messageHelper.buildErrorMessage(VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND);
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
