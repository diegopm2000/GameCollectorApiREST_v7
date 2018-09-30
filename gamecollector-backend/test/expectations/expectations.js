// expectations.js

const images = require('../expectations/images');

const getGameSystemsExpectation = [{
  id: 'AAAA1',
  name: 'Nintendo NES',
  description: 'A Nintendo 8 bits console',
  image: images.nesImage,
}, {
  id: 'BBBB2',
  name: 'Sega Megadrive',
  description: 'A Sega 16 bits console',
  image: images.megadriveImage,
}];

const getVideoGamesExpectation = [{
  id: 'CCCC1',
  name: 'Super Mario Bros',
  developer: 'Nintendo',
  gamesystem: 'Nintendo NES',
  genre: 'Platforms',
  year: 1985,
  image: 'images.superMarioBrosImage',
}, {
  id: 'DDDD2',
  name: 'Sonic',
  developer: 'Sega',
  gamesystem: 'Sega Megadrive',
  genre: 'Platforms',
  year: 1991,
  image: 'images.sonicImage',
}];

const getVideoGamesExpectationReducedFields = [{
  id: 'CCCC1',
  name: 'Super Mario Bros',
  gamesystem: 'Nintendo NES',
  year: 1985,
}, {
  id: 'DDDD2',
  name: 'Sonic',
  gamesystem: 'Sega Megadrive',
  year: 1991,
}];

const getOneGameSystemExpectation = {
  id: 'CCCC1',
  name: 'Sega Master System',
  description: 'A Seta 8 bits console',
  image: images.masterSystemImage,
};

const getOneGameSystemExpectationWithoutId = {
  name: 'Sega Master System',
  description: 'A Seta 8 bits console',
  image: images.masterSystemImage,
};

const getOneVideoGameExpectation = {
  id: 'EEEE1',
  name: 'Chrono Trigger',
  developer: 'Square',
  gamesystem: 'Nintendo Super NES',
  genre: 'Rol',
  year: 1995,
  image: 'images.chronotriggerImage',
};

const getOneVideoGameExpectationWithoutId = {
  name: 'Chrono Trigger',
  developer: 'Square',
  gamesystem: 'Nintendo Super NES',
  genre: 'Rol',
  year: 1995,
  image: 'images.chronotriggerImage',
};

const config = {
  appName: 'GameCollector Backend',
  description: 'Backend del GameCollector',
  logLevel: 'critical',
  environment: 'dev',
};

module.exports = {
  getGameSystemsExpectation,
  getVideoGamesExpectation,
  getVideoGamesExpectationReducedFields,
  getOneGameSystemExpectation,
  getOneVideoGameExpectation,
  getOneGameSystemExpectationWithoutId,
  getOneVideoGameExpectationWithoutId,
  config,
};
