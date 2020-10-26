import db from '../db';
import priceQuery from '../db/queries/price';
import { Helper, constants, DBError } from '../utils';

const { createPrice } = priceQuery;
const { CREATE_PRICE_FAIL } = constants;

/**
 * Contains a schema that describes the Price resource on the app.
 * @class PriceModel
 *
 */
class PriceModel {
  /**
   * This is a constructor for creating a Price.
   * @param { Object } options - contains the required properties for creating a
   * Price instance.
   * @returns { PriceModel } - An instance of the Price Model.
   * @constructor PriceModel
   */
  constructor(options) {
    this.company_id = options.companyId;
    this.fluid_type = options.fluidType;
    this.amount = options.amount;
  }

  /**
   * Persists a new Price request to the DB.
   * @memberof PriceModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a log object or a DB Error.
   */
  async save() {
    try {
      return db.one(createPrice, [
        this.company_id,
        this.fluid_type,
        this.amount
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_PRICE_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default PriceModel;
