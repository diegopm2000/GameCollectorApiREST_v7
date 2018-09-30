// controller.helper.js

/* global describe, it */

const { expect } = require('chai');
const controllerHelper = require('../../../../api/helpers/controller.helper');

describe('Controller Helper Tests', () => {
  it('buildError with stack Successfully', () => {
    // IN params
    const err = { stack: 'message stack' };
    // Expected Result
    const expectedResult = err.stack;
    // Launch operation
    const result = controllerHelper.buildErrorLog(err);
    // Check
    expect(result).to.deep.equal(expectedResult);
  });

  it('buildError with message Successfully', () => {
    // IN params
    const err = { message: 'message' };
    // Expected Result
    const expectedResult = err.message;
    // Launch operation
    const result = controllerHelper.buildErrorLog(err);
    // Check
    expect(result).to.equal(expectedResult);
  });

  it('buildError directly Successfully', () => {
    // IN params
    const err = { myerror: 'myerror' };
    // Expected Result
    const expectedResult = JSON.stringify(err);
    // Launch operation
    const result = controllerHelper.buildErrorLog(err);
    // Check
    expect(result).to.equal(expectedResult);
  });

  it('buildError undefined Successfully', () => {
    // IN params
    const err = undefined;
    // Expected Result
    const expectedResult = 'Error not defined';
    // Launch operation
    const result = controllerHelper.buildErrorLog(err);
    // Check
    expect(result).to.equal(expectedResult);

  });
});
