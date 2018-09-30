// videogame.repository.js

const _ = require('lodash');
const shortid = require('shortid');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Defines an initial set of gamesystems
let videogames = [];

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function stripVideoGames(fields, videogamesIN) {
  const arrayFields = fields.split(',');

  const strippedVideoGameResults = _.map(videogamesIN, videogame => _.pick(videogame, arrayFields));

  return strippedVideoGameResults;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
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

  return videogamesResult;
}

function getVideoGameById(id) {
  return videogames.find(element => element.id === id);
}

function getVideoGameByName(name) {
  return videogames.find(element => element.name === name);
}

function createVideoGame(videogameP) {
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

  return getVideoGameById(newVideoGame.id);
}

function updateVideoGame(params) {
  const idToSearch = params.id;
  const videogameToUpdate = getVideoGameById(idToSearch);

  if (videogameToUpdate !== undefined) {
    videogameToUpdate.name = params.name;
    videogameToUpdate.developer = params.developer;
    videogameToUpdate.gamesystem = params.gamesystem;
    videogameToUpdate.genre = params.genre;
    videogameToUpdate.year = params.year;
  }

  return videogameToUpdate;
}

function deleteVideoGame(id) {
  const idToSearch = id;

  const videogameToDelete = getVideoGameById(idToSearch);

  if (videogameToDelete !== undefined) {
    _.remove(videogames, element => element.id === videogameToDelete.id);
    return true;
  }
  return false;
}

function initDefaultVideoGames(videogamesSet) {
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
