// config.repository.js

// Configuration Storage
let storageConfig = {};

function getConfig() {
  return storageConfig;
}

function setConfig(config) {
  storageConfig = config;
}

module.exports = {
  getConfig,
  setConfig,
};
