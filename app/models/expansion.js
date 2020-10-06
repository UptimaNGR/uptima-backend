import db from '../db';
import expansionQuery from '../db/queries/expansion';
import { Helper, constants, DBError } from '../utils';

const { createExpansion } = expansionQuery;
const { CREATE_EXPANSION_FAIL } = constants;

/**
 * Contains a schema that describes the Expansion resource on the app.
 * @class ExpansionModel
 *
 */
class ExpansionModel {
  /**
   * This is a constructor for creating a Expansion.
   * @param { Object } options - contains the required properties for creating a
   * Expansion instance.
   * @returns { ExpansionModel } - An instance of the Expansion Model.
   * @constructor ExpansionModel
   */
  constructor(options) {
    this.company_id = options.companyId;
    this.facility_type = options.facilityType;
    this.address = options.address;
    this.capacity = options.capacity;
  }

  /**
   * Persists a new expansion request to the DB.
   * @memberof ExpansionModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a log object or a DB Error.
   */
  async save() {
    try {
      return db.none(createExpansion, [
        this.company_id,
        this.capacity,
        this.address,
        this.facility_type
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_EXPANSION_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ExpansionModel;
