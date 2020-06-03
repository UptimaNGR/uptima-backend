import queries from '../../db/queries/contact';
import { Helper, DBError, constants } from '../../utils';

const { getContactUsMsgs, getContactUsMsgsCount } = queries;

const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;
const { FETCH_CONTACT_US_MSG_ERROR } = constants;
/**
 * Contains a collection of service methods for managing contact us messages resource on the app.
 * @class ContactUsService
 *
 */
class ContactUsService {
  /**
   * Fetches a paginate list of all contact us messages
   * @memberof ContactUsService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the contact us resource or a DB Error.
   */
  static async getAllContactUsMsg({ page = 1, limit = 10 }) {
    try {
      const [count, messages] = await fetchResourceByPage({
        page,
        limit,
        getCount: getContactUsMsgsCount,
        getResources: getContactUsMsgs,
      });
      return {
        total: count.total,
        currentPage: page,
        totalPages: calcPages(count.total, limit),
        messages,
      };
    } catch (error) {
      const dbError = new DBError({
        status: FETCH_CONTACT_US_MSG_ERROR,
        message: error.message,
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ContactUsService;
