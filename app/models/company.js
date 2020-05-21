import db from '../db';
import queries from '../db/queries/company';
import { Helper, constants, DBError } from '../utils';

const { createCompany } = queries;
const { CREATE_COMPANY_ERROR } = constants;

/**
 * Contains a schema that describes the company resource on the app.
 * @class CompanyModel
 *
 */
class CompanyModel {
  /**
   * This is a constructor for creating a company.
   * @param { Object } options - contains the required properties for creating a
   * company instance.
   * @returns { CompanyModel } - An instance of the company Model.
   * @constructor CompanyModel
   */
  constructor(options) {
    this.id = options.id;
    this.company_name = options.companyName;
    this.address = options.address;
    this.email = options.email;
    this.phone_number = options.phoneNumber;
    this.subscription_type = options.subscriptionType;
    this.subscription_status = options.subscriptionStatus;
    this.logo = options.logo;
  }

  /**
   * Persists a new company to the DB.
   * @memberof CompanyModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createCompany, [
        this.id,
        this.company_name,
        this.address,
        this.email,
        this.phone_number,
        this.subscription_type,
        this.subscription_status,
        this.logo
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_COMPANY_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default CompanyModel;
