import queries from '../../db/queries/user';
import authQueries from '../../db/queries/auth';
import db from '../../db';
import { Helper, DBError, constants } from '../../utils';

const {
  fetchUserByEmail,
  fetchUserByPhone,
  fetchUserById,
  fetchUserByUsername,
  updateUserPassword,
  updateUserFacility,
  deleteUser,
  updateRoleById,
  updateUserById,
  getUsersPaginated,
  countPages,
  fetchAllManagersWithLocation
} = queries;

const { fetchAdminById } = authQueries;

const {
  UPDATE_USER_FACILITY_FAIL,
  DELETE_USER_FAIL,
  FETCH_USERS_FAIL
} = constants;

const {
  moduleErrLogMessager,
  hashPassword,
  fetchResourceByPage,
  calcPages
} = Helper;

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
    const host = email.split('@')[1];
    return host.includes('uptima')
      ? db.oneOrNone(fetchAdminById, [email])
      : db.oneOrNone(fetchUserByEmail, [email]);
  }

  /**
   * Fetches a managers in a company
   * @memberof UserService
   * @param {string} companyId - company id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static getAllUserByCompanyId(companyId) {
    return db.oneOrNone(fetchAllManagersWithLocation, [companyId]);
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

  /**
   * Updates a User's password by his/her id.
   * @memberof UserService
   * @param { Object } id - The id of the User.
   * @param { Object } password - The new password.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a User resource or a DB Error.
   */
  static async updatePassword(id, password) {
    const { hash, salt } = hashPassword(password);
    return db.oneOrNone(updateUserPassword, [id, hash, salt]);
  }

  /**
   * Updates the Facility id of a specific User.
   * @memberof UserService
   * @param { Object } data - The data of the specific User before update.
   * @param { String } newFacilityId - The FacilityId to be used for the update.
   * @returns { Promise< Object | Error> } A promise that resolves or rejects
   * with a User Object or a DB Error Object.
   */
  static async updateFacility(data, newFacilityId) {
    try {
      return db.one(updateUserFacility, [data.id, newFacilityId]);
    } catch (error) {
      const dbError = new DBError({
        status: UPDATE_USER_FACILITY_FAIL,
        message: error.message
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  /**
   * Deletes a specific User from the DB.
   * @memberof UserService
   * @param { Object } data - The data of the specific User to be deleted.
   * @returns { Promise< Null | Error> } A promise that resolves or rejects
   * with a null value or a DB Error Object.
   */
  static async deleteById(data) {
    try {
      await db.none(deleteUser, [data.id]);
    } catch (error) {
      const dbError = new DBError({
        status: DELETE_USER_FAIL,
        message: error.message
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  /**
   * Update the role of a User.
   * @memberof UserService
   * @param { Object } data - An object representation of the User.
   * @param { String } newRole - The new role to assign the User.
   * @returns { Promise< Null | Error> } A promise that resolves or rejects
   * with a null value or a DB Error Object.
   */
  static async updateUserRole(data, newRole) {
    try {
      await db.none(updateRoleById, [data.id, newRole]);
    } catch (error) {
      const dbError = new DBError({
        status: DELETE_USER_FAIL,
        message: error.message
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  /**
   * Fetches a paginate list of all Users in .
   * @memberof UserService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async fetchAll({ page = 1, limit = 30, facilityId }) {
    try {
      const [count, resources] = await fetchResourceByPage({
        page,
        limit,
        getCount: countPages,
        getResources: getUsersPaginated,
        params: [facilityId],
        countParams: [facilityId]
      });
      return {
        total: count.total,
        currentPage: page,
        totalPages: calcPages(count.total, limit),
        resources
      };
    } catch (error) {
      const dbError = new DBError({
        status: FETCH_USERS_FAIL,
        message: error.message
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  /**
   * Updates a User by his/her id.
   * @memberof UserService
   * @param { Object } oldData - The details of User before update.
   * @param { Object } reqData - The data to be used to update a specific User.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a User resource or a DB Error.
   */
  static async updateUserById(oldData, reqData) {
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateUserById, [
      data.first_name,
      data.last_name,
      data.middle_name,
      data.role,
      data.email,
      data.phone_number,
      data.company_id,
      data.username,
      data.facility_id,
      oldData.id
    ]);
  }
}

export default UserService;
