import { ExpansionModel, ComplaintModel } from '../../models';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_EXPANSION_SUCCESS,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_EXPANSION_ERROR,
  CREATE_COMPLAINT_ERROR
} = constants;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the company.
 *
 * @class CompanyController
 */
class RequestController {
  /**
   * Controllers used for adding complaints
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof RequestController
   */
  static async addComplaint(req, res, next) {
    try {
      const complaint = new ComplaintModel({
        ...req.body,
        ...req.params
      });
      await complaint.save();
      return successResponse(res, {
        message: CREATE_COMPLAINT_SUCCESS,
        data: { ...complaint }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_COMPLAINT_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_COMPLAINT_ERROR }));
      throw dbError;
    }
  }

  /**
   * Controllers used for adding expansion
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof RequestController
   */
  static async addExpansion(req, res, next) {
    try {
      const expansion = new ExpansionModel({
        ...req.body,
        ...req.params
      });
      await expansion.save();
      return successResponse(res, {
        message: CREATE_EXPANSION_SUCCESS,
        data: { ...expansion }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_EXPANSION_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_EXPANSION_ERROR }));
      throw dbError;
    }
  }
}

export default RequestController;
