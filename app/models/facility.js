import db from '../db';
import queries from '../db/queries/facility';
import { Helper, constants, DBError } from '../utils';

const { createFacility } = queries;
const { CREATE_FACILITY_ERROR } = constants;

/**
 * Contains a schema that describes the Facility resource on the app.
 * @class FacilityModel
 *
 */
class FacilityModel {
  /**
   * This is a constructor for creating a Facility.
   * @param { Object } options - contains the required properties for creating a
   * Facility instance.
   * @returns { FacilityModel } - An instance of the Facility Model.
   * @constructor FacilityModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.company_id = options.companyId;
    this.gps_coordinate = options.gpsCoordinate;
    this.facility_name = options.facilityName;
    this.facility_type = options.facilityType;
  }

  /**
   * Persists a new Facility to the DB.
   * @memberof FacilityModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createFacility, [
        this.id,
        this.company_id,
        this.gps_coordinate,
        this.facility_type,
        this.facility_name
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_FACILITY_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default FacilityModel;
