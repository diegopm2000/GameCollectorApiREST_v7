// gamesystem.controller.js

const _ = require('lodash');

const log = require('../helpers/log.helper');
const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const gamesystemService = require('../services/gamesystem.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[GameSystem Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getGameSystems(req, res) {
  try {
    // Receiving parameters
    const params = {
      name: req.swagger.params.name.value,
      sort: req.swagger.params.sort.value,
    };
    log.info(`${MODULE_NAME}:${getGameSystems.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = gamesystemService.getGameSystems(params);

    // Returning the result
    log.info(`${MODULE_NAME}:${getGameSystems.name} (OUT) --> result: ${JSON.stringify(result)}`);
    res.json(result);
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
  }
}

function getGameSystemById(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    log.info(`${MODULE_NAME}:${getGameSystemById.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = gamesystemService.getGameSystemById(params.id);

    // Returning the result
    if (!_.isUndefined(result)) {
      log.info(`${MODULE_NAME}:${getGameSystemById.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.json(result);
    } else {
      const messageResult = messageHelper.buildMessage(GS_CT_ERR_GAMESYSTEM_NOT_FOUND);
      log.info(`${MODULE_NAME}:${getGameSystemById.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.status(404).json(messageResult);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystemById.name, error, res);
  }
}

function createGameSystem(req, res) {
  try {
    // Receiving parameters
    const params = req.body;
    log.info(`${MODULE_NAME}:${createGameSystem.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = gamesystemService.createGameSystem(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      log.info(`${MODULE_NAME}:${createGameSystem.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.status(201).json(result);
    } else {
      const messageResult = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${createGameSystem.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.status(409).json(messageResult);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
  }
}

function updateGameSystem(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    _.assign(params, req.body);
    log.info(`${MODULE_NAME}:${updateGameSystem.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = gamesystemService.updateGameSystem(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      log.info(`${MODULE_NAME}:${updateGameSystem.name} (OUT) --> result: ${JSON.stringify(result)}`);
      res.json(result);
    } else {
      const messageResult = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${updateGameSystem.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.status(409).json(messageResult);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
  }
}

function deleteGameSystem(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    log.info(`${MODULE_NAME}:${deleteGameSystem.name} (IN) --> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = gamesystemService.deleteGameSystem(params.id);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      const messageResult = messageHelper.buildMessage(GS_CT_DELETED_SUCCESSFULLY);
      log.info(`${MODULE_NAME}:${deleteGameSystem.name} (OUT) --> result: ${JSON.stringify(messageResult)}`);
      res.json(messageResult);
    } else {
      const messageError = messageHelper.buildMessage(result.error);
      log.info(`${MODULE_NAME}:${deleteGameSystem.name} (OUT) --> result: ${JSON.stringify(messageError)}`);
      res.status(404).json(messageError);
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteGameSystem.name, error, res);
  }
}

module.exports = {
  getGameSystems,
  getGameSystemById,
  createGameSystem,
  updateGameSystem,
  deleteGameSystem,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME,
};
