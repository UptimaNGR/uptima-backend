import queries from '../../db/queries/tank';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchTankById,
  fetchTankByFacilityId,
  fetchTankBySerialNumberAndFacilityId,
  updateTankById,
  fetchTankBySerialNumber,
  updateTankPriceById,
  fetchTankPriceById
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
   * Fetches a Tank price by id
   * @memberof TankService
   * @param {string} id - id of the tank
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankPriceById(id) {
    return db.oneOrNone(fetchTankPriceById, [id]);
  }

  /**
   * Fetches a Tank by serialNumber
   * @memberof TankService
   * @param {string} serialNumber - serial Number of the tank
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankBySerialNumber(serialNumber) {
    return db.oneOrNone(fetchTankBySerialNumber, [serialNumber]);
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
   * @param { Object } tankId - The id of Tank to be updated.
   * @param { Object } reqData - The data to be used to update a specific Tank.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Tank resource or a DB Error.
   */
  static async updateTankById(tankId, reqData) {
    const oldData = await TankService.getTankById(tankId);
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

  /**
   * Updates a Tank price by id.
   * @memberof TankService
   * @param { Object } tankId - The id of Tank to be updated.
   * @param { Object } reqData - The data to be used to update a specific Tank.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Tank resource or a DB Error.
   */
  static async updateTankPriceById(tankId, reqData) {
    const oldData = await TankService.getTankPriceById(tankId);
    const data = { ...oldData, ...reqData };
    return db.one(updateTankPriceById, [
      data.price,
      data.min_level,
      oldData.id
    ]);
  }
}

export default TankService;
