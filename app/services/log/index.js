import queries from '../../db/queries/logs';
import { Helper, constants } from '../../utils';

const { countPages, getLoginLogPaginated } = queries;
const { fetchResourceByPage, calcPages } = Helper;

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class LogService
 *
 */
class LogService {
  /**
   * Fetches a paginate list of all requisitions.
   * @memberof LogService
   * @param {string} companyId - company_id
   * @returns { Promise<object | Error> } A promise that resolves or rejects
   * with an Array of requisitions objects or a DB Error.
   */
  static async fetchLogs({ page = 1, limit = 30, companyId }) {
    try {
      const [count, logs] = await fetchResourceByPage({
        page,
        limit,
        getCount: countPages,
        getResources: getLoginLogPaginated,
        params: [companyId],
        countParams: [companyId]
      });
      return {
        total: count.total,
        currentPage: page,
        totalPages: calcPages(count.total, limit),
        log: logs
      };
    } catch (error) {
      throw Helper.makeError({
        error,
        status: constants.FAIL_TO_FETCH_LOGS
      });
    }
  }
}

export default LogService;
