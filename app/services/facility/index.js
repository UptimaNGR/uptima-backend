import queries from '../../db/queries/facility';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchFacilityByCompanyId,
  fetchFacilityByGps,
  fetchFacilityById,
  fetchAllFacilities,
  updateFacilityById
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
    return db.manyOrNone(fetchAllFacilities);
  }

  /**
   * Updates a Facility by id.
   * @memberof FacilityService
   * @param { Object } oldData - The details of Facility before update.
   * @param { Object } reqData - The data to be used to update a specific Facility.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Facility resource or a DB Error.
   */
  static async updateFacilityById(oldData, reqData) {
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateFacilityById, [
      data.company_id,
      data.gps_coordinate,
      data.facility_name,
      data.facility_type,
      data.address,
      oldData.id
    ]);
  }
}

export default FacilityService;
