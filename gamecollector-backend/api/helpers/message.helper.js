// message.helper.js

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const TITLE_ERROR = 'error';
const TITLE_MESSAGE = 'message';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function buildGenericMessage(nameMessage, textMessage) {
  const jsonMessageResult = {};
  jsonMessageResult[nameMessage] = textMessage;
  return jsonMessageResult;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function buildErrorMessage(text) {
  const jsonErrorMessage = buildGenericMessage(TITLE_ERROR, text);
  return jsonErrorMessage;
}

function buildMessage(text) {
  const jsonErrorMessage = buildGenericMessage(TITLE_MESSAGE, text);
  return jsonErrorMessage;
}

module.exports = {
  buildGenericMessage, // For testing
  buildErrorMessage,
  buildMessage,
};
