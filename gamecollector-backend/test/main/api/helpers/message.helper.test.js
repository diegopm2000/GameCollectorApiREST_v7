// message.helper.test.js

/* global describe, it */

const { expect } = require('chai');

const messageHelper = require('../../../../api/helpers/message.helper');

describe('Message Helper Tests', () => {
  it('buildErrorMessage Successfully', () => {
    // IN params
    const text = 'Forced Error for testing';
    // Expected Result
    const expectedResult = { error: 'Forced Error for testing' };
    // Launch operation
    const result = messageHelper.buildErrorMessage(text);
    // Check
    expect(result).to.deep.equal(expectedResult);
  });

  it('buildMessage Successfully', () => {
    // IN params
    const text = 'Forced Error for testing';
    // Expected Result
    const expectedResult = { message: 'Forced Error for testing' };
    // Launch operation
    const result = messageHelper.buildMessage(text);
    // Check
    expect(result).to.deep.equal(expectedResult);
  });
});
