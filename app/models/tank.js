import db from '../db';
import queries from '../db/queries/tank';
import { Helper, constants, DBError } from '../utils';

const { createTank } = queries;
const { CREATE_TANK_ERROR } = constants;

/**
 * Contains a schema that describes the Tank resource on the app.
 * @class TankModel
 *
 */
class TankModel {
  /**
   * This is a constructor for creating a Tank.
   * @param { Object } options - contains the required properties for creating a
   * Tank instance.
   * @returns { TankModel } - An instance of the Tank Model.
   * @constructor TankModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.company_id = options.companyId;
    this.facility_id = options.facilityId;
    this.fluid_type = options.fluidType;
    this.serial_number = options.serialNumber;
    this.height = options.height;
    this.surface_area = options.surfaceArea;
    this.structure_type = options.structureType;
    this.total_volume = parseFloat(options.totalVolume) * 1000;
  }

  /**
   * Persists a new Tank to the DB.
   * @memberof TankModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createTank, [
        this.id,
        this.company_id,
        this.facility_id,
        this.serial_number,
        this.fluid_type,
        this.structure_type,
        this.height,
        this.surface_area,
        this.total_volume
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_TANK_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default TankModel;
