// tracelevel.bootstrap.js

const log = require('../helpers/log.helper');
const configService = require('../services/config.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module name
const MODULE_NAME = '[TraceLevel Bootstrap]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function setTraceLevel() {
  log.debug(`${MODULE_NAME}:${setTraceLevel.name} (IN) --> no params`);

  const { logLevel } = configService.getConfig();
  log.setTraceLevel(logLevel);

  log.debug(`${MODULE_NAME}:${setTraceLevel.name} (OUT) --> Set trace level to level: ${logLevel}`);
  return logLevel;
}

module.exports = {
  setTraceLevel,
};
