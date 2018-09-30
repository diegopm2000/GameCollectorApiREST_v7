// config.service.mock

/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

function getConfig() {
  return expectations.config;
}

function loadConfig() {
  return expectations.config;
}

function setConfig(config) {

}

module.exports = {
  getConfig,
  loadConfig,
  setConfig,
};
