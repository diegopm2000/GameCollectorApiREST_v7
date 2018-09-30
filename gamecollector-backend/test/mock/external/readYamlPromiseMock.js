// readYAmlPromiseMock.js

/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

module.exports = function (file) {
  return new Promise((resolve) => {
    resolve(expectations.config);
  });
};
