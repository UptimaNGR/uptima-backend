import queries from '../../db/queries/user';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchUserByEmail,
  fetchUserByPhone,
  fetchUserById,
  fetchUserByUsername
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a User by email
   * @memberof UserService
   * @param {string} email - email of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static getUserByEmail(email) {
    return db.oneOrNone(fetchUserByEmail, [email]);
  }

  /**
   * Fetches a User by phone
   * @memberof UserService
   * @param {string} phone - phone number of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static getUserByPhone(phone) {
    return db.oneOrNone(fetchUserByPhone, [phone]);
  }

  /**
   * Fetches a User by id
   * @memberof UserService
   * @param {string} id - id of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static getUserById(id) {
    return db.oneOrNone(fetchUserById, [id]);
  }

  /**
   * Fetches a User by username
   * @memberof UserService
   * @param {string} username - username of user
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static getUserByUsername(username) {
    return db.oneOrNone(fetchUserByUsername, [username]);
  }
}

export default UserService;
