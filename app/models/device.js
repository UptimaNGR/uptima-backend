import db from '../db';
import queries from '../db/queries/device';
import { Helper, constants, DBError } from '../utils';

const { createDevice } = queries;
const { CREATE_DEVICE_ERROR } = constants;

/**
 * Contains a schema that describes the Device resource on the app.
 * @class DeviceModel
 *
 */
class DeviceModel {
  /**
   * This is a constructor for creating a Device.
   * @param { Object } options - contains the required properties for creating a
   * Device instance.
   * @returns { DeviceModel } - An instance of the Device Model.
   * @constructor DeviceModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.company_id = options.companyId;
    this.facility_id = options.facilityId;
    this.tank_id = options.tankId;
    this.serial_number = options.serialNumber;
    this.dist_to_device = options.distToDevice;
  }

  /**
   * Persists a new Device to the DB.
   * @memberof DeviceModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createDevice, [
        this.id,
        this.company_id,
        this.facility_id,
        this.tank_id,
        this.serial_number,
        this.dist_to_device
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_DEVICE_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default DeviceModel;
