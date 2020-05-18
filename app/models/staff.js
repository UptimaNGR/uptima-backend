import db, { redisDB } from '../db';
import queries from '../db/queries/auth';
import { Helper, constants, DBError } from '../utils';


const { REDIS_KEYS: { staffLocation } } = constants;

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
    const { hash, salt } = Helper.hashPassword(
      options.password || constants.STAFF_DEFAULT_PASSWORD
    );
    this.id = Helper.generateId();
    this.staff_id = options.staff_id;
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email;
    this.password = hash;
    this.salt = salt;
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
      // Todo
      // Create a job for deleting keys [ sets, hashes and strings ]
      // Create a job that adds key values [sets, hashes and strings]
      await redisDB.delAsync(staffLocation(this.location_id));
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
