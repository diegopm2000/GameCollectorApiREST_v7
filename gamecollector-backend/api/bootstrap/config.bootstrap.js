// config.bootstrap.js

const log = require('../helpers/log.helper');
const configService = require('../services/config.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module name
const MODULE_NAME = '[Config Bootstrap]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function initAppConfig() {
  // Config Source
  const source = process.env.NODE_CONFIG_SOURCE_APP;
  // Config Git URI
  const gituri = process.env.NODE_CONFIG_GIT_URI;
  // Config file
  const file = process.env.NODE_CONFIG_FILE;

  log.info(`${MODULE_NAME}:${initAppConfig.name} (IN) --> params from ENV: source: ${source}, file: ${file}, gituri: ${gituri}`);

  // Call Service
  const configLoaded = await configService.loadConfig({ source, file, gituri });
  // Store config loaded into Config Service
  configService.setConfig(configLoaded);

  log.info(`${MODULE_NAME}:${initAppConfig.name} (OUT) --> App Config loaded OK!`);
  return configLoaded;
}

module.exports = {
  initAppConfig,
};
