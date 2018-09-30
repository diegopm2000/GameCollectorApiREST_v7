// config.bootstrap.mock.js

const expectations = require('../../expectations/expectations');

async function initAppConfig() {
  return new Promise((resolve) => {
    resolve(expectations.config);
  });
}

module.exports = {
  initAppConfig,
};
