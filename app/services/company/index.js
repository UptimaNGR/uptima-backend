import queries from '../../db/queries/company';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchCompanyByEmail,
  fetchCompanyByPhone
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing company resource on the app.
 * @class CompanyService
 *
 */
class CompanyService {
  /**
   * Fetches a company by email
   * @memberof CompanyService
   * @param {string} email - email of company
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the company resource or a DB Error.
   */
  static getCompanyByEmail(email) {
    return db.oneOrNone(fetchCompanyByEmail, [email]);
  }

  /**
   * Fetches a company by phone
   * @memberof CompanyService
   * @param {string} phone - phone number of company
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the company resource or a DB Error.
   */
  static getCompanyByPhone(phone) {
    return db.oneOrNone(fetchCompanyByPhone, [phone]);
  }
}

export default CompanyService;
