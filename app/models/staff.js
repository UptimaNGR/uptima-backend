import db from '../db';
import queries from '../db/queries/user';
import { Helper, constants, DBError } from '../utils';


// const {CREATE_STAFF_SUCCESSFULLY} = constants;

/**
 * Contains a schema that describes the staff resource on the app.
 * @class StaffModel
 *
 */
class StaffModel {
  /**
      * This is a constructor for creating a staff.
      * @param { Object } options - contains the required properties for creating a
      * staff instance.
      * @returns { StaffModel } - An instance of the Staff Model.
      * @constructor StaffModel
      */
  constructor(options) {
    this.id = Helper.generateId();
    this.staff_id = options.staff_id;
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email;
    this.password = options.hash;
    this.salt = options.salt;
    this.role = options.role;
    this.location_id = options.locationId;
    this.phone = options.phone;
  }

  /**
     * Persists a new staff to the DB.
     * @memberof StaffModel
     * @returns { Promise<Object | Error> } A promise that resolves or rejects
     * with a staff object or a DB Error.
     */
  async save() {
    try {
      return db.one(queries.createStaff,
        [
          this.id,
          this.staff_id,
          this.first_name,
          this.last_name,
          this.email,
          this.password,
          this.salt,
          this.role,
          this.location_id,
          this.phone
        ]);
    } catch (e) {
      const dbError = new DBError({
        status: constants.ADD_STAFF_TO_LOCATION_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default StaffModel;
