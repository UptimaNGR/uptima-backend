import queries from '../../db/queries/device';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchDeviceById,
  fetchDeviceBySerialNumber,
  fetchDeviceByTankId
} = queries;

/**
 * Contains a collection of service methods for managing Device resource on the app.
 * @class DeviceService
 *
 */
class DeviceService {
  /**
   * Fetches a Device by id
   * @memberof DeviceService
   * @param {string} id - id of the Device
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Device resource or a DB Error.
   */
  static getDeviceById(id) {
    return db.oneOrNone(fetchDeviceById, [id]);
  }

  /**
   * Fetches a Device by tankId
   * @memberof DeviceService
   * @param {string} tankId - id of the facility
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Device resource or a DB Error.
   */
  static getDeviceByTankId(tankId) {
    return db.oneOrNone(fetchDeviceByTankId, [tankId]);
  }

  /**
   * Fetches a Device by tankId and SerialNumber
   * @memberof DeviceService
   * @param {string} serialNumber - serial number of the Device
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Device resource or a DB Error.
   */
  static getDeviceBySerialNumber(serialNumber) {
    return db.oneOrNone(fetchDeviceBySerialNumber, [serialNumber]);
  }
}

export default DeviceService;
