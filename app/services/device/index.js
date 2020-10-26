import queries from '../../db/queries/device';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchDeviceById,
  fetchDeviceBySerialNumber,
  fetchDeviceByTankId,
  updateDeviceById
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

  /**
   * Updates a Tank by id.
   * @memberof DeviceService
   * @param { Object } oldData - The details of Device before update.
   * @param { Object } reqData - The data to be used to update a specific Device.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Device resource or a DB Error.
   */
  static async updateDeviceById(oldData, reqData) {
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateDeviceById, [
      data.tank_id,
      data.serial_number,
      data.dist_to_device,
      data.company_id,
      data.facility_id,
      oldData.id
    ]);
  }

  /**
   * Fetches a Device by tankId and SerialNumber
   * @memberof DeviceService
   * @param {string} serialNumber - serial number of the Device
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Device resource or a DB Error.
   */
  static getDeviceByInactivity() {
    return 'hi';
  }
}

export default DeviceService;
