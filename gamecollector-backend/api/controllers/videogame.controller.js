// videogame.controller.js

const _ = require('lodash');

const log = require('../helpers/log.helper');
const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const videogameService = require('../services/videogame.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[VideoGame Controller]';

// Error Messages
const VG_CT_ERR_VIDEOGAME_NOT_FOUND = 'Videogame not found';

// Success Messages
const VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY = 'Videogame deleted successfully';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getVideoGames(req, res) {
  try {
    // Receiving parameters
    const params = {
      name: req.swagger.params.name.value,
      developer: req.swagger.params.developer.value,
      gamesystem: req.swagger.params.gamesystem.value,
      genre: req.swagger.params.genre.value,
      sort: req.swagger.params.sort.value,
      fields: req.swagger.params.fields.value,
    };
    log.info(`${MODULE_NAME}:${getVideoGames.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = videogameService.getVideoGames(params);

    // Returning the result
    log.info(`${MODULE_NAME}:${getVideoGames.name} (OUT) --> result: ${JSON.stringify(result)}`);
    res.json(result);
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGames.name, error, res);
  }
}

function getVideoGameById(req, res) {
  try {
    // Receiving parameters
    const id = req.swagger.params.id.value;
    log.info(`${MODULE_NAME}:${getVideoGameById.name} (IN) --> id: ${id}`);

    // Call to service
    const result = videogameService.getVideoGameById(id);

    // Returning the result
    if (!_.isUndefined(result)) {
      log.info(`${MODULE_NAME}:${getVideoGameById.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.json(result);
    } else {
      const messageResult = messageHelper.buildMessage(VG_CT_ERR_VIDEOGAME_NOT_FOUND);
      log.info(`${MODULE_NAME}:${getVideoGameById.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.status(404).json(messageResult);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGameById.name, error, res);
  }
}

function createVideoGame(req, res) {
  try {
    // Receiving parameters
    const params = req.body;
    log.info(`${MODULE_NAME}:${createVideoGame.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = videogameService.createVideoGame(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      log.info(`${MODULE_NAME}:${createVideoGame.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.status(201).json(result);
    } else {
      const messageError = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${createVideoGame.name} (OUT) --> result: ${JSON.stringify(messageError)}`);
      res.status(404).json(messageHelper.buildMessage(result.error));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createVideoGame.name, error, res);
  }
}

function updateVideoGame(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    _.assign(params, req.body);
    log.info(`${MODULE_NAME}:${updateVideoGame.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = videogameService.updateVideoGame(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      log.info(`${MODULE_NAME}:${updateVideoGame.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.json(result);
    } else {
      const messageError = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${updateVideoGame.name} (OUT) --> result: ${JSON.stringify(messageError)}`);
      res.status(404).json(messageError);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateVideoGame.name, error, res);
  }
}

function deleteVideoGame(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    log.info(`${MODULE_NAME}:${deleteVideoGame.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = videogameService.deleteVideoGame(params.id);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      const messageResult = messageHelper.buildMessage(VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY);
      log.info(`${MODULE_NAME}:${deleteVideoGame.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.json(messageResult);
    } else {
      const messageError = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${deleteVideoGame.name} (OUT) --> result: ${JSON.stringify(messageError)}`);
      res.status(404).json(messageError);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteVideoGame.name, error, res);
  }
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  MODULE_NAME,
  VG_CT_ERR_VIDEOGAME_NOT_FOUND,
  VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY,
};
