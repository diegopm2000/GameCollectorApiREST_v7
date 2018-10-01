// gamesystem.repository.js

const _ = require('lodash');
const shortid = require('shortid');

const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Name of the module
const MODULE_NAME = 'GameSystem Repository';
// Defines an initial set of gamesystems
let gamesystems = [];

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function getGameSystems(params) {
  log.debug(`${MODULE_NAME}:${getGameSystems.name} (IN) -> params: ${JSON.stringify(params)}`);

  let gamesystemsResult = gamesystems.slice();

  // Filter by name
  if (params.name !== undefined) {
    gamesystemsResult = _.filter(gamesystems, { name: params.name });
  }

  // Order by name
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      gamesystemsResult = _.orderBy(gamesystemsResult, ['name'], ['asc']);
    } else if (params.sort === '-name') {
      gamesystemsResult = _.orderBy(gamesystemsResult, ['name'], ['desc']);
    }
  }

  // Returning result
  log.debug(`${MODULE_NAME}:${getGameSystems.name} (OUT) -> result: ${JSON.stringify(gamesystemsResult)}`);
  return gamesystemsResult;
}

function getGameSystemById(id) {
  log.debug(`${MODULE_NAME}:${getGameSystemById.name} (IN) -> id: ${id}`);

  const result = gamesystems.find(element => element.id === id);

  log.debug(`${MODULE_NAME}:${getGameSystemById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function getGameSystemByName(name) {
  log.debug(`${MODULE_NAME}:${getGameSystemByName.name} (IN) -> name: ${name}`);

  const result = gamesystems.find(element => element.name === name);

  log.debug(`${MODULE_NAME}:${getGameSystemByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function createGameSystem(gameSystemP) {
  log.debug(`${MODULE_NAME}:${createGameSystem.name} (IN) -> gameSystem: ${gameSystemP}`);

  const newGameSystem = {
    id: shortid.generate(),
    name: gameSystemP.name,
    description: gameSystemP.description,
    image: gameSystemP.image,
  };

  gamesystems.push(newGameSystem);

  const result = getGameSystemById(newGameSystem.id);

  log.debug(`${MODULE_NAME}:${createGameSystem.name} (OUT) -> result: ${result}`);
  return result;
}

function updateGameSystem(gameSystemP) {
  log.debug(`${MODULE_NAME}:${updateGameSystem.name} (IN) -> gameSystem: ${gameSystemP}`);

  const idToSearch = gameSystemP.id;

  const gameSystemToUpdate = getGameSystemById(idToSearch);

  if (gameSystemToUpdate !== undefined) {
    gameSystemToUpdate.name = gameSystemP.name;
    gameSystemToUpdate.description = gameSystemP.description;
    gameSystemToUpdate.image = gameSystemP.image;
  }

  const result = gameSystemToUpdate;

  log.debug(`${MODULE_NAME}:${updateGameSystem.name} (OUT) -> result: ${result}`);
  return result;
}

function deleteGameSystem(id) {
  log.debug(`${MODULE_NAME}:${deleteGameSystem.name} (IN) -> id: ${id}`);

  let result = false;

  const idToSearch = id;

  const gameSystemToDelete = getGameSystemById(idToSearch);

  if (gameSystemToDelete !== undefined) {
    _.remove(gamesystems, element => element.id === gameSystemToDelete.id);
    result = true;
  }

  log.debug(`${MODULE_NAME}:${deleteGameSystem.name} (OUT) -> result: ${result}`);
  return result;
}

function initDefaultGameSystems(gamesystemsSet) {
  log.debug(`${MODULE_NAME}:${initDefaultGameSystems.name} (IN) -> gamesystemsSet: ${JSON.stringify(gamesystemsSet)}`);

  gamesystems = gamesystemsSet.slice();
}

module.exports = {
  getGameSystems,
  getGameSystemById,
  getGameSystemByName,
  createGameSystem,
  updateGameSystem,
  deleteGameSystem,
  initDefaultGameSystems,
};

