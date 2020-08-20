import { LogsModel } from '../../models';

/**
 * A collection of worker methods tha handles event related to logs.
 *
 * @class LogsWorker
 */
class LogsWorker {
  /**
   * Handles the tasks that should be carried out whenever a new user is created.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async saveLoginLog({ data }, done) {
    try {
      const LogModel = new LogsModel({ ...data.logData });
      await LogModel.save();
      done();
    } catch (e) {
      done(e);
    }
  }
}

export default LogsWorker;
