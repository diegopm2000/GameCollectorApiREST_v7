// config.helper.mock.js

/* eslint-disable */

const expectations = require('../../expectations/expectations');

function setConfig(config) {

}

function getConfig() {
  return expectations.config;
}

function loadConfigFromYmlFile(file) {
  return new Promise((resolve) => {
    resolve(expectations.config);
  })
}

module.exports = {
  setConfig,
  getConfig,
  loadConfigFromYmlFile,
};
