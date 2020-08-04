import db from '../db';
import queries from '../db/queries/contact';
import { Helper, constants, DBError } from '../utils';

const { createContactUs } = queries;
const { CONTACT_US_MSG_CREATED_ERROR } = constants;

/**
 * Contains a schema that describes the contact us resource on the app.
 * @class ContactUsHomepageModel
 *
 */
class ContactUsHomepageModel {
  /**
   * This is a constructor for creating a contact us .
   * @param { Object } options - contains the required properties for creating a
   * contact us instance.
   * @returns { ContactUsHomepageModel } - An instance of the contact us Model.
   * @constructor ContactUsHomepageModel
   */
  constructor(options) {
    this.name = options.name;
    this.email = options.email;
    this.phone_number = options.phoneNumber;
    this.company_name = options.companyName;
    this.message = options.message;
  }

  /**
   * Persists a new contact us  to the DB.
   * @memberof ContactUsHomepageModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a contact us object or a DB Error.
   */
  async save() {
    try {
      return db.one(createContactUs, [
        this.name,
        this.email,
        this.phone_number,
        this.company_name,
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

export default ContactUsHomepageModel;
