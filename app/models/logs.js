import db from '../db';
import logsQuery from '../db/queries/logs';
import { Helper, constants, DBError } from '../utils';

const { createLoginLog } = logsQuery;
const { CREATE_LOGIN_LOG_FAIL } = constants;

/**
 * Contains a schema that describes the Logs resource on the app.
 * @class LogsModel
 *
 */
class LogsModel {
  /**
   * This is a constructor for creating a Logs.
   * @param { Object } options - contains the required properties for creating a
   * Logs instance.
   * @returns { LogsModel } - An instance of the Logs Model.
   * @constructor LogsModel
   */
  constructor(options) {
    this.company_id = options.companyId;
    this.user_id = options.userId;
  }

  /**
   * Persists a new log to the DB.
   * @memberof LogsModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a log object or a DB Error.
   */
  async save() {
    try {
      return db.none(createLoginLog, [this.company_id, this.user_id]);
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_LOGIN_LOG_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default LogsModel;
