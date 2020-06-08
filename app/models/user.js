import db from '../db';
import queries from '../db/queries/user';
import { Helper, constants, DBError } from '../utils';

const { createUser } = queries;
const { CREATE_USER_ERROR } = constants;

/**
 * Contains a schema that describes the User resource on the app.
 * @class UserModel
 *
 */
class UserModel {
  /**
   * This is a constructor for creating a User.
   * @param { Object } options - contains the required properties for creating a
   * User instance.
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.username = options.username;
    this.first_name = options.firstName;
    this.company_id = options.companyId;
    this.last_name = options.lastName;
    this.email = options.email;
    this.phone_number = options.phoneNumber;
    this.password = options.hash;
    this.role = options.role;
    this.salt = options.salt;
    this.middle_name = options.middleName;
    this.is_admin = options.isAdmin ? options.isAdmin : false;
    this.facility_id = options.facilityId;
  }

  /**
   * Persists a new User to the DB.
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createUser, [
        this.id,
        this.first_name,
        this.last_name,
        this.middle_name,
        this.username,
        this.password,
        this.salt,
        this.role,
        this.email,
        this.phone_number,
        this.company_id,
        this.is_admin,
        this.facility_id
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_USER_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default UserModel;
