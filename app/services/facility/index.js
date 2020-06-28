import queries from '../../db/queries/facility';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchFacilityByCompanyId,
  fetchFacilityByGps,
  fetchFacilityById,
  fetchAllFacilities,
  updateFacilityById,
  fetchFacilityCloseAndOpenTimeById,
  updateFacilityCloseAndOpenTimeById
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing Facility resource on the app.
 * @class FacilityService
 *
 */
class FacilityService {
  /**
   * Fetches a Facility by gps
   * @memberof FacilityService
   * @param {string} gps - gps of Facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getFacilityByGps(gps) {
    return db.oneOrNone(fetchFacilityByGps, [gps]);
  }

  /**
   * Fetches a Facility by email
   * @memberof FacilityService
   * @param {string} id - id of Facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Facility resource or a DB Error.
   */
  static getFacilityCloseAndOpenTimeById(id) {
    return db.oneOrNone(fetchFacilityCloseAndOpenTimeById, [id]);
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
   * @param { Object } facilityId - The id of Facility to be updated.
   * @param { Object } reqData - The data to be used to update a specific Facility.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Facility resource or a DB Error.
   */
  static async updateFacilityById(facilityId, reqData) {
    const oldData = await FacilityService.getFacilityById(facilityId);
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

  /**
   * Updates a Facility close and open time by id.
   * @memberof FacilityService
   * @param { Object } facilityId - The id of Facility to be updated.
   * @param { Object } reqData - The data to be used to update a specific Facility.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Facility resource or a DB Error.
   */
  static async updateFacilityCloseAndOpenTimeById(facilityId, reqData) {
    const oldData = await FacilityService.getFacilityCloseAndOpenTimeById(
      facilityId
    );
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateFacilityCloseAndOpenTimeById, [
      data.opening_time,
      data.closing_time,
      oldData.id
    ]);
  }
}

export default FacilityService;
