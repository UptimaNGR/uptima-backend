import config from '../../config/env';

const {
  UPTIMA_BASE_URL,
  NODE_ENV,
  PORT
} = config;

const BASE_URL = NODE_ENV === 'production'
  ? UPTIMA_BASE_URL
  : `http://localhost:${PORT || 3500}`;

export default {
  INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
  NOT_FOUND_API: 'Oops, You have reached a dead end',
  INVALID_PERMISSION:
    'Permission denied. Current user does not have the required permission to access this resource.',
  INVALID_CREDENTIALS: 'Invalid email/password',
  ACCESS_REVOKED: 'Your access has been revoked',
  EMAIL_CONFLICT: 'A user with your email already exists',
  AUTH_REQUIRED: 'Access denied,a valid access token is required',
  '2HRS': 7200,
  '8HRS': 28800,
  BASE_URL,
  STAFF_DEFAULT_PASSWORD: 'admin',
  ROLE_ARRAY: ['store', 'super', 'staff'],
  ACCESS_FIELD_REQUIRED: 'access field is required as boolean',
  ADMIN_TO_ADMIN_NOT_ALLOWED:
    'You cannot remove an admin within your rank unless you are the owner of the app',
  OWNER_REMOVAL_NOT_SUPPORTED:
    'We currently do not support the removal or de-activation of superior users, contact support.',
  ROLE_NOT_SUFFICIENT:
    'You required a higher access level to utilize this resource',
  DB_ERROR_STATUS: 'DB_PROCESS_FAILED',
  MODULE_ERROR_STATUS: 'MODULE_PROCESS_BROKE',
  SUCCESS: 'success',
  SUCCESS_RESPONSE: 'Request was successfully processed',
  FAIL: 'fail',
  WELCOME: 'Thanks for dropping by, you are at uptima',
  v1: '/api/v1',
  DB_ERROR: 'A database error occurred, either in redis or postgres',
  MODULE_ERROR: 'A module error occurred',
  FAILED_TO_SAVE_ACCESS_TOKEN: 'FAILED_TO_SAVE_ACCESS_TOKEN',
  FETCH_STAFFS_FAIL: 'FETCH_STAFFS_FAIL',
  ADD_STAFF_TO_LOCATION_FAIL: 'ADD_STAFF_TO_LOCATION_FAIL',
  FETCH_STAFFS_BY_LOCATION_FAIL: 'FETCH_STAFFS_BY_LOCATION_FAIL',
  DELETE_STAFF_FAIL: 'DELETE_STAFF_FAIL',
  UPDATE_STAFF_LOCATION_FAIL: 'UPDATE_STAFF_LOCATION_FAIL',
  FAILED_TO_RECORD_ACTIVITY: 'FAILED_TO_RECORD_ACTIVITY',
  FETCH_PRODUCTS_FAIL: 'FETCH_PRODUCTS_FAIL',
  LOCATION_ACCESS_DENIED:
    'You are not allowed to access resources for other locations',
  STAFF_EMAIL_EXIST_VERIFICATION_FAIL: 'STAFF_EMAIL_EXIST_VERIFICATION_FAIL',
  FETCH_SALES_BY_LOCATION_FAIL: 'FETCH_SALES_BY_LOCATION_FAIL',
  STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG:
    'Error verifying existence of email, try again.',
  STAFF_NOT_FOUND_MSG: 'A staff with the id provided was not found',
  STAFF_NOT_FOUND: 'STAFF_NOT_FOUND',
  CREATE_STAFF_SUCCESSFULLY: 'Successfully registered staff to location.',
  CREATE_STAFF_FAILED: 'Error registering staff',
  LOGIN_USER_SUCCESSFULLY: 'Successfully logged in user',
  FETCH_STAFFS_SUCCESSFULLY: 'Successfully retrieved staffs',
  FETCH_STAFF_SUCCESSFULLY: 'Successfully retrieved staff',
  UPDATE_STAFF_SUCCESSFULLY: 'Successfully updated Staff',
  VALIDATE_STAFF_ID_FAIL: 'Error validating staff id',
  ERROR_FETCHING_STAFFS: 'Error fetching staffs',
  ERROR_UPDATING_STAFF: 'Error updating Staff',
  FAILED_TO_START_END_OF_DAY: 'Error ending day',
  SUCCESSFULLY_STARTED_END_OF_DAY:
    'End of day has been initialized successfully',
  SUCCESSFULLY_GRANT_ACCESS: 'Successfully granted staff access',
  SUCCESSFULLY_REVOKED_ACCESS: 'Successfully revoked staff access',
  FETCH_LOCATIONS_SUCCESSFULLY: 'Successfully retrieved locations',
  FETCH_LOCATION_SUCCESSFULLY: 'Successfully retrieved location',
  UPDATE_STAFF_PASSWORD_SUCCESSFULLY: 'Successfully changed password',
  ERROR_UPDATING_PASSWORD: 'Error changing password',
  UPDATED_STAFF_ACCESS_FAILED_MSG: 'Error updating staff access',
  SUCCESSFULLY_UPDATED_LOCATION: 'Successfully updated staff location',
  STAFF_LOCATION_UPDATE_FAILED: 'Error updating staff location',
  SUCCESSFULLY_UPDATED_ROLE: 'Successfully updated staff role',
  STAFF_ROLE_UPDATE_FAILED: 'Error updating staff role',
  SUCCESSFULLY_REMOVED_STAFF: 'Successfully removed staff from location',
  ERROR_REMOVING_STAFF: 'Error removing staff from location',
  ROLE_NOT_SUFFICIENT_LOCATION:
    'You do not have sufficient permission to interact with this location resource',
  
  REDIS_RUNNING: 'Redis server is running',
  UPTIMA_RUNNING: 'Uptima is running on PORT',
  REF_NUM_ERROR: 'Error, please try again!',
  STAFF_ID_ERROR: 'Error, please try again!'
};
