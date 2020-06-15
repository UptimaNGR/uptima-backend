import queries from '../../db/queries/company';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchCompanyByEmail,
  fetchCompanyByPhone,
  fetchCompanyById,
  fetchAllCompany,
  updateCompanyById
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

  /**
   * Fetches a company by id
   * @memberof CompanyService
   * @param {string} id - id of company
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the company resource or a DB Error.
   */
  static getCompanyById(id) {
    return db.oneOrNone(fetchCompanyById, [id]);
  }

  /**
   * Fetches all company
   * @memberof CompanyService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the company resource or a DB Error.
   */
  static getAllCompany() {
    return db.manyOrNone(fetchAllCompany);
  }

  /**
   * Updates a Company by id.
   * @memberof CompanyService
   * @param { Object } oldData - The details of Company before update.
   * @param { Object } reqData - The data to be used to update a specific Company.
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Company resource or a DB Error.
   */
  static async updateCompanyById(oldData, reqData) {
    const data = { ...oldData, ...reqData };
    return db.oneOrNone(updateCompanyById, [
      data.company_name,
      data.address,
      data.email,
      data.subscription_type,
      data.subscription_status,
      data.logo,
      data.phone_number,
      oldData.id
    ]);
  }
}

export default CompanyService;
