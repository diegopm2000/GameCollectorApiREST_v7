// app.js

const log = require('./api/helpers/log.helper');

const swaggerExpressBootstrap = require('./api/bootstrap/swaggerExpress.bootstrap');
const configBootstrap = require('./api/bootstrap/config.bootstrap');
const traceLevelBootstrap = require('./api/bootstrap/tracelevel.bootstrap');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Main App]';
const appRoot = __dirname;

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function logAppStarted(functionName) {
  log.info(`${MODULE_NAME} ${functionName}`);
  log.info(`${MODULE_NAME} ${functionName} -------------------------------------------------------------------------`);
  log.info(`${MODULE_NAME} ${functionName} --                         App Initialized OK!                         --`);
  log.info(`${MODULE_NAME} ${functionName} -------------------------------------------------------------------------`);
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function init() {
  try {
    log.info(`${MODULE_NAME}:${init.name} (IN) --> starting}`);

    // 1. Load Config
    await configBootstrap.initAppConfig();

    // 2. Set Trace Level
    traceLevelBootstrap.setTraceLevel();

    // 3. Start Swagger
    await swaggerExpressBootstrap.start(appRoot, process.env.NODE_PORT);

    // 4. Log App Started OK
    logAppStarted(init.name);
    // 5. Exit with true
    return true;
  } catch (error) {
    log.error(`${MODULE_NAME}:${init.name} (ERROR) --> error: ${error.message}`);
    // 6. Exit with false
    return false;
  }
}

function stop() {
  swaggerExpressBootstrap.stop();
}

// The application starts here when this module is loaded!
init();

module.exports = {
  init,
  stop,
};
