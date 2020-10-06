import db from '../db';
import complaintQuery from '../db/queries/complaint';
import { Helper, constants, DBError } from '../utils';

const { createComplaint } = complaintQuery;
const { CREATE_COMPLAINT_FAIL } = constants;

/**
 * Contains a schema that describes the Complaint resource on the app.
 * @class ComplaintModel
 *
 */
class ComplaintModel {
  /**
   * This is a constructor for creating a Complaint.
   * @param { Object } options - contains the required properties for creating a
   * Complaint instance.
   * @returns { ComplaintModel } - An instance of the Complaint Model.
   * @constructor ComplaintModel
   */
  constructor(options) {
    this.company_id = options.companyId;
    this.category = options.category;
    this.message = options.message;
  }

  /**
   * Persists a new Complaint request to the DB.
   * @memberof ComplaintModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a log object or a DB Error.
   */
  async save() {
    try {
      return db.none(createComplaint, [
        this.company_id,
        this.category,
        this.message
      ]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_COMPLAINT_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ComplaintModel;
