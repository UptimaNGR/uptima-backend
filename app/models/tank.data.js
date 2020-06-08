import db from '../db';
import queries from '../db/queries/tank.data';
import { Helper, constants, DBError } from '../utils';

const { createTankData } = queries;
const { CREATE_TANK_DATA_ERROR } = constants;

/**
 * Contains a schema that describes the TankData resource on the app.
 * @class TankDataModel
 *
 */
class TankDataModel {
  /**
   * This is a constructor for creating a TankData.
   * @param { Object } options - contains the required properties for creating a
   * TankData instance.
   * @returns { TankDataModel } - An instance of the TankData Model.
   * @constructor TankDataModel
   */
  constructor(options) {
    this.company_id = options.company_id;
    this.tank_id = options.tank_id;
    this.device_serial_number = options.serialNumber;
    this.volume = options.volume;
  }

  /**
   * Persists a new TankData to the DB.
   * @memberof TankDataModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createTankData, [
        this.company_id,
        this.device_serial_number,
        this.tank_id,
        this.volume
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_TANK_DATA_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default TankDataModel;
