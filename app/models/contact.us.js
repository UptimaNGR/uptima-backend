import db from '../db';
import queries from '../db/queries/contact';
import { Helper, constants, DBError } from '../utils';

const { createMsg } = queries;
const { CONTACT_US_MSG_CREATED_ERROR } = constants;

/**
 * Contains a schema that describes the staff resource on the app.
 * @class ContactUsModel
 *
 */
class ContactUsModel {
  /**
   * This is a constructor for creating a staff.
   * @param { Object } options - contains the required properties for creating a
   * contact us instance.
   * @returns { ContactUsModel } - An instance of the contact us Model.
   * @constructor ContactUsModel
   */
  constructor(options) {
    this.name = options.name;
    this.email = options.email;
    this.phone_number = options.phoneNumber;
    this.company_name = options.companyName;
    this.facility_type = options.facilityType;
    this.number_of_tanks = options.numberOfTanks;
    this.message = options.message;
  }

  /**
   * Persists a new staff to the DB.
   * @memberof ContactUsModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createMsg, [
        this.name,
        this.email,
        this.phone_number,
        this.company_name,
        this.facility_type,
        this.number_of_tanks,
        this.message
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CONTACT_US_MSG_CREATED_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ContactUsModel;
