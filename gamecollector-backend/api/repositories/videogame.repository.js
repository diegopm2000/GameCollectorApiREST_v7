// videogame.repository.js

const _ = require('lodash');
const shortid = require('shortid');

const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Name of the module
const MODULE_NAME = 'GameSystem Repository';
// Defines an initial set of gamesystems
let videogames = [];

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function stripVideoGames(fields, videogamesIN) {
  log.debug(`${MODULE_NAME}:${stripVideoGames.name} (IN) -> fields: ${JSON.stringify(fields)}, videogamesIN: ${JSON.stringify(videogamesIN)}`);

  const arrayFields = fields.split(',');
  const strippedVideoGameResults = _.map(videogamesIN, videogame => _.pick(videogame, arrayFields));

  log.debug(`${MODULE_NAME}:${stripVideoGames.name} (OUT) -> result: ${JSON.stringify(strippedVideoGameResults)}`);
  return strippedVideoGameResults;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
  log.debug(`${MODULE_NAME}:${getVideoGames.name} (IN) -> params: ${JSON.stringify(params)}`);

  let videogamesResult = videogames.slice();

  // Filter by name
  if (params.name !== undefined) {
    videogamesResult = _.filter(videogamesResult, { name: params.name });
  }
  // Filter by developer
  if (params.developer !== undefined) {
    videogamesResult = _.filter(videogamesResult, { developer: params.developer });
  }
  // Filter by game system
  if (params.gamesystem !== undefined) {
    videogamesResult = _.filter(videogamesResult, { gamesystem: params.gamesystem });
  }
  // Filter by genre
  if (params.genre !== undefined) {
    videogamesResult = _.filter(videogamesResult, { genre: params.genre });
  }
  // Filter by year
  if (params.year !== undefined) {
    videogamesResult = _.filter(videogamesResult, { year: params.year });
  }

  // Order by field
  if (params.sort !== undefined) {
    let direction;
    let nameField;

    if (_.startsWith(params.sort, '-')) {
      direction = 'desc';
      nameField = params.sort.substring(1);
    } else {
      direction = 'asc';
      nameField = params.sort;
    }

    videogamesResult = _.orderBy(videogamesResult, [nameField], [direction]);
  }

  // Returning only specific fields
  if (params.fields !== undefined) {
    videogamesResult = stripVideoGames(params.fields, videogamesResult);
  }

  // Returning the result
  log.debug(`${MODULE_NAME}:${getVideoGames.name} (OUT) -> result: ${JSON.stringify(videogamesResult)}`);
  return videogamesResult;
}

function getVideoGameById(id) {
  log.debug(`${MODULE_NAME}:${getVideoGameById.name} (IN) -> id: ${id}`);

  const result = videogames.find(element => element.id === id);

  log.debug(`${MODULE_NAME}:${getVideoGameById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function getVideoGameByName(name) {
  log.debug(`${MODULE_NAME}:${getVideoGameByName.name} (IN) -> name: ${name}`);

  const result = videogames.find(element => element.name === name);

  log.debug(`${MODULE_NAME}:${getVideoGameByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function createVideoGame(videogameP) {
  log.debug(`${MODULE_NAME}:${createVideoGame.name} (IN) -> videogameP: ${JSON.stringify(videogameP)}`);

  const newVideoGame = {
    id: shortid.generate(),
    name: videogameP.name,
    developer: videogameP.developer,
    gamesystem: videogameP.gamesystem,
    genre: videogameP.genre,
    year: videogameP.year,
    image: videogameP.image,
  };

  videogames.push(newVideoGame);

  const result = getVideoGameById(newVideoGame.id);

  log.debug(`${MODULE_NAME}:${createVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function updateVideoGame(params) {
  log.debug(`${MODULE_NAME}:${updateVideoGame.name} (IN) -> params: ${JSON.stringify(params)}`);

  const idToSearch = params.id;
  const videogameToUpdate = getVideoGameById(idToSearch);

  if (videogameToUpdate !== undefined) {
    videogameToUpdate.name = params.name;
    videogameToUpdate.developer = params.developer;
    videogameToUpdate.gamesystem = params.gamesystem;
    videogameToUpdate.genre = params.genre;
    videogameToUpdate.year = params.year;
  }

  const result = videogameToUpdate;

  log.debug(`${MODULE_NAME}:${updateVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function deleteVideoGame(id) {
  log.debug(`${MODULE_NAME}:${deleteVideoGame.name} (IN) -> id: ${id}`);

  let result = false;

  const idToSearch = id;
  const videogameToDelete = getVideoGameById(idToSearch);

  if (videogameToDelete !== undefined) {
    _.remove(videogames, element => element.id === videogameToDelete.id);
    result = true;
  }

  log.debug(`${MODULE_NAME}:${deleteVideoGame.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

function initDefaultVideoGames(videogamesSet) {
  log.debug(`${MODULE_NAME}:${initDefaultVideoGames.name} (IN) -> videogamesSet: ${JSON.stringify(videogamesSet)}`);

  videogames = videogamesSet.slice();
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  getVideoGameByName,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  initDefaultVideoGames,
};
