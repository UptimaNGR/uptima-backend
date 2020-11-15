import config from '../../config/env';

const {
  UPTIMA_BASE_URL,
  NODE_ENV,
  PORT
} = config;

const BASE_URL = NODE_ENV === 'production'
  ? UPTIMA_BASE_URL
  : `http://localhost:${PORT || 3000}`;

export default {
  INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
  NOT_FOUND_API: 'Oops, You have reached a dead end',
  INVALID_PERMISSION:
    'Permission denied. Current user does not have the required permission to access this resource.',
  INVALID_CREDENTIALS: 'Incorrect login details',
  ACCESS_REVOKED: 'Your access has been revoked',
  EMAIL_CONFLICT: 'A user with your email already exists',
  AUTH_REQUIRED: 'Access denied,a valid access token is required',
  '2HRS': 7200,
  '8HRS': 28800,
  BASE_URL,
  events: {
    SEND_PASSWORD_TO_EMAIL: 'SEND_PASSWORD_TO_EMAIL',
    SEND_CONTACT_US_MSG: 'SEND_CONTACT_US_MSG',
    SEND_FORGOT_PASSWORD_TO_EMAIL: 'SEND_FORGOT_PASSWORD_TO_EMAIL',
    SEND_MIN_LEVEL_ALERT: 'SEND_MIN_LEVEL_ALERT',
    SEND_ACTIVITY_DURING_CLOSE: 'SEND_ACTIVITY_DURING_CLOSE',
    CHECK_DEVICE_INACTIVITY: 'CHECK_DEVICE_INACTIVITY',
    SAVE_LOGIN_LOG: 'SAVE_LOGIN_LOG'
  },
  ROLE_ARRAY: ['owner', 'manager', 'basic'],
  INVALID_ROLE_PARAMETER: 'Invalid role value',
  INVALID_TYPE_PARAMETER: 'Invalid facility type value',
  FACILITY_TYPE_ARRAY: ['isolated', 'tanker', 'station'],
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
  ADD_USER_TO_FACILITY_FAIL: 'ADD_USER_TO_FACILITY_FAIL',
  FETCH_USERS_BY_FACILITY_FAIL: 'FETCH_USERS_BY_FACILITY_FAIL',
  DELETE_USER_FAIL: 'DELETE_USER_FAIL',
  UPDATE_USER_FACILITY_FAIL: 'UPDATE_USER_FACILITY_FAIL',
  FAILED_TO_RECORD_ACTIVITY: 'FAILED_TO_RECORD_ACTIVITY',
  FETCH_PRODUCTS_FAIL: 'FETCH_PRODUCTS_FAIL',
  FACILITY_ACCESS_DENIED:
    'You are not allowed to access resources for other Facilities',
  USER_EMAIL_EXIST_VERIFICATION_FAIL: 'USER_EMAIL_EXIST_VERIFICATION_FAIL',
  USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG:
    'Error verifying existence of email, try again.',
  USER_NOT_FOUND_MSG: 'A USER with the id provided was not found',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  CREATE_USER_SUCCESSFULLY: 'Successfully registered USER to FACILITY.',
  CREATE_USER_FAILED: 'Error registering USER',
  LOGIN_USER_SUCCESSFULLY: 'Successfully logged in user',
  FETCH_USERS_SUCCESSFULLY: 'Successfully retrieved users',
  FETCH_USER_SUCCESSFULLY: 'Successfully retrieved USER',
  UPDATE_USER_SUCCESSFULLY: 'Successfully updated USER',
  VALIDATE_USER_ID_FAIL: 'Error validating USER id',
  ERROR_FETCHING_USERS: 'Error fetching users',
  ERROR_UPDATING_USER: 'Error updating USER',
  FAILED_TO_START_END_OF_DAY: 'Error ending day',
  SUCCESSFULLY_STARTED_END_OF_DAY:
    'End of day has been initialized successfully',
  SUCCESSFULLY_GRANT_ACCESS: 'Successfully granted USER access',
  SUCCESSFULLY_REVOKED_ACCESS: 'Successfully revoked USER access',
  FETCH_FACILITIES_SUCCESSFULLY: 'Successfully retrieved Facilities',
  FETCH_FACILITY_SUCCESSFULLY: 'Successfully retrieved FACILITY',
  UPDATE_USER_PASSWORD_SUCCESSFULLY: 'Successfully changed password',
  ERROR_UPDATING_PASSWORD: 'Error changing password',
  UPDATED_USER_ACCESS_FAILED_MSG: 'Error updating USER access',
  SUCCESSFULLY_UPDATED_FACILITY: 'Successfully updated USER FACILITY',
  USER_FACILITY_UPDATE_FAILED: 'Error updating USER FACILITY',
  SUCCESSFULLY_UPDATED_ROLE: 'Successfully updated USER role',
  USER_ROLE_UPDATE_FAILED: 'Error updating USER role',
  SUCCESSFULLY_REMOVED_USER: 'Successfully removed USER from FACILITY',
  ERROR_REMOVING_USER: 'Error removing USER from FACILITY',
  ROLE_NOT_SUFFICIENT_FACILITY:
    'You do not have sufficient permission to interact with this FACILITY resource',

  REDIS_RUNNING: 'Redis server is running',
  UPTIMA_RUNNING: 'Uptima is running on PORT',
  CONTACT_US_MSG_CREATED_SUCCESSFULLY: 'Created message successfully',
  CONTACT_US_MSG_CREATED_ERROR: 'Error submitting message',
  FETCH_CONTACT_US_MSG_SUCCESSFULLY: 'Successfully retrieved messages',
  FETCH_CONTACT_US_MSG_ERROR: 'Error retrieving messages',
  CREATE_COMPANY_ERROR: 'Error creating company',
  CREATE_COMPANY_SUCCESS: 'Success creating company',
  PHONE_ERROR: 'Phone number registered already',
  USERNAME_ERROR: 'Username registered already',
  GENERIC_ERROR: 'Sorry, something went wrong',
  COMPANY_NOT_FOUND: 'Company does not exist',
  CREATE_DEVICE_ERROR: 'Error creating device',
  CREATE_DEVICE_SUCCESS: 'Device created successfully',
  CREATE_USER_ERROR: 'Error creating user',
  CREATE_USER_SUCCESS: 'Created user successfully',
  CREATE_TANK_ERROR: 'Error creating tank',
  CREATE_FACILITY_ERROR: 'Error creating facility',
  CREATE_FACILITY_SUCCESS: 'Facility created successfully',
  CREATE_TANK_DATA_ERROR: 'Error creating tank data',
  TANK_DATA_CREATED_SUCCESSFULLY: 'Success creating tank data',
  FAILED_CREATE_JOB: 'Failed to create job',
  TANK_VOLUME_ERROR: 'Error calculating volume',
  SERIAL_NUMBER_ERROR: 'Serial number exists already',
  SERIAL_NUMBER_NOT_FOUND: 'Device not found',
  TANK_DEVICE_ERROR: 'Tank has a device already',
  ERROR_FETCHING_FACILITIES: 'Error fetching facilities',
  ERROR_FETCHING_TANK: 'Error fetching tank',
  FETCH_TANK_SUCCESSFULLY: 'Successfully retrieved tank',
  ERROR_FETCHING_TANK_DATA: 'Error fetching tank data',
  FETCH_TANK_DATA_SUCCESSFULLY: 'Successfully retrieved tank data',
  ERROR_UPDATING_PROFILE: 'Error updating profile',
  UPDATE_USER_PROFILE_SUCCESSFULLY: 'Profile updated Successfully',
  FACILITY_NOT_FOUND: 'Facility not found',
  TANK_NOT_FOUND: 'Tank not found',
  GET_ALL_COMPANY_ERROR: 'Error getting all companies',
  GET_ALL_COMPANY_SUCCESS: 'Retrieved all companies successfully',
  GET_ONE_COMPANY_ERROR: 'Error getting company',
  GET_ONE_COMPANY_SUCCESS: 'Retrieved company successfully',
  UPDATE_COMPANY_PROFILE_SUCCESSFULLY: 'Successfully updated company profile',
  UPDATE_TANK_SUCCESSFULLY: 'Successfully updated tank',
  ERROR_UPDATING_TANK: 'Error updating tank',
  UPDATE_DEVICE_SUCCESSFULLY: 'Successfully updated device',
  ERROR_UPDATING_DEVICE: 'Error updating device',
  ERROR_FETCHING_DEVICE: 'Error fetching device',
  FETCH_DEVICE_SUCCESSFULLY: 'Successfully retrieved device',
  ERROR_FETCHING_FACILITY: 'Error fetching facility',
  FORGOT_PASSWORD_REQUEST_SUCCESS: 'Check your email for a reset link',
  ERROR_FETCHING_USER: 'Error fetching user',
  UPDATE_TANK_PRICE_SUCCESSFULLY: 'Updated Successfully',
  ERROR_UPDATING_FACILITY: 'Error updating facility details',
  COMPANY_ID_ABSENT: 'Please provide the company id',
  FACILITY_ID_ABSENT: 'Please provide the FACILITY id',
  TANK_ID_ABSENT: 'Please provide the TANK id',
  DEVICE_ID_ABSENT: 'Please provide the DEVICE id',
  CREATE_LOGIN_LOG_FAIL: 'Error creating login log',
  FAIL_TO_FETCH_LOGS: 'Error while fetching login logs',
  FETCH_LOGIN_LOG_SUCCESSFULLY: 'Successfully fetched login logs',
  GET_COMPANY_USER_SUCCESS: 'Successfully fetched users',
  GET_COMPANY_USER_ERROR: 'Error while fetching users',
  SUCCESS_EDITING_USER_ROLE: 'Role successfully updated',
  ERROR_EDITING_USER_ROLE: 'Role update failed',
  DELETE_USER_ERROR: 'Error while removing user',
  DELETE_USER_SUCCESS: 'User deleted successfully',
  CREATE_EXPANSION_FAIL: 'Error creating expansion request',
  CREATE_COMPLAINT_FAIL: 'Error creating COMPLAINT request',
  COMPLAINT_CATEGORIES: ['others', 'inaccurate data', 'alerts', 'faulty device'],
  CREATE_PRICE_FAIL: 'Error creating price',
  CREATE_PRICE_SUCCESS: 'Created price successfully',
  CREATE_PRICE_ERROR: 'Error creating price',
  COULD_NOT_REMOVE_COMPLETED_JOB: 'COULD_NOT_REMOVE_COMPLETED_JOB',
  COULD_NOT_FETCH_COMPLETED_JOB: 'COULD_NOT_FETCH_COMPLETED_JOB',
  EMAIL_WAS_NOT_SENT: 'Email could not be sent'
};
