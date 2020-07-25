import { expect } from 'chai';
import { Helper, ApiError, genericErrors } from '../../app/utils';
import {
  originText,
  wrongText,
  genericErrorObj,
  genericNotFound,
  genericAuthRequired,
  genericInValidLogin,
  genericUnAuthorized
} from '../fixtures';

const {
  hashPassword,
  compareHash,
  generateId,
  generateUniquePassword
} = Helper;

describe('Basic Utility Functions', () => {
  let salt;
  let hash;
  it('should generate uuid', () => {
    const id = generateId();
    expect(id).to.be.a('string').of.length(36);
  });
  it('should generate a string password of length 9', () => {
    const password = generateUniquePassword();
    expect(password).to.be.a('string').of.length(9);
  });
  it('should return true when the hash value generated from a string is used together with its salt value to verify its authenticity', async () => {
    const hashObj = await hashPassword(originText);
    salt = hashObj.salt;
    hash = hashObj.hash;
    const isTrue = compareHash(originText, hash, salt);
    expect(isTrue).to.eql(true);
  });
  it('should return false when a string is compared with the hash and salt values of another string', () => {
    const isTrue = compareHash(wrongText, hash, salt);
    expect(isTrue).to.eql(false);
  });
  it('should return a generic error object when no arguments is passed to the constructor while instantiating the custom Api Error class', () => {
    const error = new ApiError();
    expect(error).to.include(genericErrorObj);
  });
  it('should return a custom 404 error object when the generic notFoundApi object is used', () => {
    expect(genericErrors.notFoundApi).to.include(genericNotFound);
  });
  it('should return a custom 404 error object when the generic notFoundApi object is used', () => {
    expect(genericErrors.notFoundApi).to.include(genericNotFound);
  });
  it('should return a custom 401 error object which indicates invalid authentication token when the generic authRequired object is used', () => {
    expect(genericErrors.authRequired).to.include(genericAuthRequired);
  });
  it('should return the custom 401 error object which indicates an invalid login credential when the generic inValidLogin object is used', () => {
    expect(genericErrors.inValidLogin).to.include(genericInValidLogin);
  });
  it('should return the custom 403 error object which indicates a higher access level is required when the generic UnAuthorized object is used', () => {
    expect(genericErrors.unAuthorized).to.include(genericUnAuthorized);
  });
});
