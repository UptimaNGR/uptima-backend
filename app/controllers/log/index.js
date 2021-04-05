import LogService from '../../services/log';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { FETCH_LOGIN_LOG_SUCCESSFULLY, FAIL_TO_FETCH_LOGS } = constants;
/**
 * A collection of methods that controls the success response
 * for CRUD operations on the contact us.
 *
 * @class LogController
 */
class LogController {
  /**
   * Controllers used for all login logs
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us messages
   * @memberof LogController
   */
  static async fetchLoginLog(req, res, next) {
    try {
      const data = await LogService.fetchLogs({ ...req.query, ...req.params });
      return successResponse(res, {
        message: FETCH_LOGIN_LOG_SUCCESSFULLY,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: FAIL_TO_FETCH_LOGS,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: FAIL_TO_FETCH_LOGS }));
    }
  }
}

export default LogController;
