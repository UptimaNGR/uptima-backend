import queries from '../../db/queries/tank';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchTankById,
  fetchTankByFacilityId,
  fetchTankBySerialNumberAndFacilityId,
  updateTankById
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
    return db.oneOrNone(fetchTankBySerialNumberAndFacilityId, [
      facilityId,
      serialNumber
    ]);
  }

  /**
   * Updates a Tank by id.
   * @memberof TankService
   * @param { Object } oldData - The details of Tank before update.
   * @param { Object } reqData - The data to be used to update a specific Tank.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Tank resource or a DB Error.
   */
  static async updateTankById(oldData, reqData) {
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateTankById, [
      data.company_id,
      data.facility_id,
      data.serial_number,
      data.fluid_type,
      data.structure_type,
      data.height,
      data.surface_area,
      data.total_volume,
      oldData.id
    ]);
  }
}

export default TankService;
