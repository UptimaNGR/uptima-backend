import queries from '../../db/queries/tank';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchTankById,
  fetchTankByFacilityId,
  fetchTankBySerialNumberAndFacilityId
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing Tank resource on the app.
 * @class TankService
 *
 */
class TankService {
  /**
   * Fetches a Tank by id
   * @memberof TankService
   * @param {string} id - id of the tank
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankById(id) {
    return db.oneOrNone(fetchTankById, [id]);
  }

  /**
   * Fetches a Tank by facility id
   * @memberof TankService
   * @param {string} facilityId - id of the facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankByFacilityId(facilityId) {
    return db.manyOrNone(fetchTankByFacilityId, [facilityId]);
  }

  /**
   * Fetches a Tank by facility id and SerialNumber
   * @memberof TankService
   * @param {string} facilityId - id of the facility
   * @param {string} serialNumber - serial number of the tank
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankByFacilityIdAndSerialNumber(facilityId, serialNumber) {
    return db.oneOrNone(fetchTankBySerialNumberAndFacilityId, [facilityId, serialNumber]);
  }
}

export default TankService;
