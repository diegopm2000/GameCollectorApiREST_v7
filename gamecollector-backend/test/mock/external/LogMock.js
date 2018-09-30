// LogMock.js

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

class LogMock {
  constructor(params) {
    LogMock.spyConstructor(params);
    this.level = params.level;
    this.color = params.color;
  }

  debug(text) {

  }

  info(text) {

  }

  error(text) {

  }
  // Specific Spy for constructor
  static spyConstructor(params) {

  }
}

module.exports = LogMock;
