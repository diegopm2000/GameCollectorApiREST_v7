// gamesystem.repository.js

const _ = require('lodash');
const shortid = require('shortid');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Defines an initial set of gamesystems
let gamesystems = [];

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function getGameSystems(params) {
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

  return gamesystemsResult;
}

function getGameSystemById(id) {
  return gamesystems.find(element => element.id === id);
}

function getGameSystemByName(name) {
  return gamesystems.find(element => element.name === name);
}

function createGameSystem(gameSystemP) {
  const newGameSystem = {
    id: shortid.generate(),
    name: gameSystemP.name,
    description: gameSystemP.description,
    image: gameSystemP.image,
  };

  gamesystems.push(newGameSystem);

  return getGameSystemById(newGameSystem.id);
}

function updateGameSystem(gameSystemP) {
  const idToSearch = gameSystemP.id;

  const gameSystemToUpdate = getGameSystemById(idToSearch);

  if (gameSystemToUpdate !== undefined) {
    gameSystemToUpdate.name = gameSystemP.name;
    gameSystemToUpdate.description = gameSystemP.description;
    gameSystemToUpdate.image = gameSystemP.image;
  }

  return gameSystemToUpdate;
}

function deleteGameSystem(id) {
  const idToSearch = id;

  const gameSystemToDelete = getGameSystemById(idToSearch);

  if (gameSystemToDelete !== undefined) {
    _.remove(gamesystems, element => element.id === gameSystemToDelete.id);
    return true;
  }
  return false;
}

function initDefaultGameSystems(gamesystemsSet) {
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

