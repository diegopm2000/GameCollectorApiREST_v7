// config.service.js

const path = require('path');
const readYaml = require('read-yaml-promise');
const rp = require('request-promise');

const log = require('../helpers/log.helper');
const configRepository = require('../repositories/config.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Config Service]';
// Path con yml config files
const PATH_CONFIG_FILES = './config';
// GIT SOURCE
const GIT_SOURCE = 'GIT';
// YAML FILE SOURCE
const YAML_FILE_SOURCE = 'YAML_FILE';
// Error Source not valid
const ERROR_SOURCE_NOT_VALID = 'Config source not valid!';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

// Loads the configuration from yml file
async function loadConfigFromYmlFile(file) {
  log.debug(`${MODULE_NAME}:${loadConfigFromYmlFile.name} (IN) -> file: ${file}`);

  const pathFile = PATH_CONFIG_FILES + path.sep + file;

  const data = await readYaml(pathFile);

  log.debug(`${MODULE_NAME}:${loadConfigFromYmlFile.name} (OUT) -> data: ${JSON.stringify(data)}`);
  return data;
}

// Loads the configuration from GIT server
async function loadConfigFromGIT(gituri, file) {
  log.debug(`${MODULE_NAME}:${loadConfigFromGIT.name} (IN) -> gituri: ${gituri}, file: ${file}`);

  const uri = `${gituri}/${file}`;

  const response = await rp.get(uri, { json: true });

  log.debug(`${MODULE_NAME}:${loadConfigFromGIT.name} (OUT) -> data: ${JSON.stringify(response)}`);
  return response;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

// Load config from source (cache, yaml file or git)
async function loadConfig({ source, file, gituri }) {
  log.debug(`${MODULE_NAME}:${loadConfig.name} (IN) -> source: ${source}, file: ${file}, gituri: ${gituri}`);

  let result = null;
  if (source === YAML_FILE_SOURCE) {
    result = await loadConfigFromYmlFile(file);
  } else if (source === GIT_SOURCE) {
    result = await loadConfigFromGIT(gituri, file);
  } else {
    throw new Error(ERROR_SOURCE_NOT_VALID);
  }

  return result;
}

// Update config in config repository
async function updateConfig({ source, file, gituri }) {
  log.info(`${MODULE_NAME}:${updateConfig.name} (IN) -> source: ${source}, file: ${file}, gituri: ${gituri}`);

  const config = await loadConfig({ source, file, gituri });
  module.exports.setConfig(config);
  return config;
}

// Get config from config storage
function getConfig() {
  const result = configRepository.getConfig();
  return result;
}

// Set the config in storage
function setConfig(config) {
  configRepository.setConfig(config);
}

module.exports = {
  GIT_SOURCE,
  YAML_FILE_SOURCE,
  ERROR_SOURCE_NOT_VALID,
  loadConfigFromYmlFile,
  loadConfigFromGIT,
  loadConfig,
  updateConfig,
  getConfig,
  setConfig,
};
