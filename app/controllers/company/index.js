import { CompanyModel } from '../../models';
// import CompanyService from '../../services/company';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { CREATE_COMPANY_ERROR, CREATE_COMPANY_SUCCESS } = constants;

// const {} = CompanyService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the company.
 *
 * @class CompanyController
 */
class CompanyController {
  /**
   * Controllers used for adding unavailable item patterns
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof CompanyController
   */
  static async addCompany(req, res, next) {
    try {
      const Company = new CompanyModel({
        ...req.body
      });
      const { id } = await Company.save();
      return successResponse(res, {
        message: CREATE_COMPANY_SUCCESS,
        data: { id, ...Company }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_COMPANY_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_COMPANY_ERROR }));
      throw dbError;
    }
  }
}

export default CompanyController;
