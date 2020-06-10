import queries from '../../db/queries/facility';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchFacilityByCompanyId,
  fetchFacilityByGps,
  fetchFacilityById,
  fetchAllFacilities
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing Facility resource on the app.
 * @class FacilityService
 *
 */
class FacilityService {
  /**
   * Fetches a Facility by email
   * @memberof FacilityService
   * @param {string} gps - email of Facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getFacilityByEmail(gps) {
    return db.oneOrNone(fetchFacilityByGps, [gps]);
  }

  /**
   * Fetches a Facility by phone
   * @memberof FacilityService
   * @param {string} companyId - company id of Facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getFacilityByCompanyId(companyId) {
    return db.manyOrNone(fetchFacilityByCompanyId, [companyId]);
  }

  /**
   * Fetches a Facility by id
   * @memberof FacilityService
   * @param {string} id - id of Facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getFacilityById(id) {
    return db.oneOrNone(fetchFacilityById, [id]);
  }

  /**
   * Fetches all Facilities
   * @memberof FacilityService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getAllFacility() {
    return db.oneOrNone(fetchAllFacilities);
  }
}

export default FacilityService;
