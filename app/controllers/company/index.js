import { CompanyModel, PriceModel } from '../../models';
import CompanyService from '../../services/company';
import UserService from '../../services/user';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_COMPANY_ERROR,
  CREATE_COMPANY_SUCCESS,
  GET_ALL_COMPANY_SUCCESS,
  GET_ALL_COMPANY_ERROR,
  UPDATE_COMPANY_PROFILE_SUCCESSFULLY,
  ERROR_UPDATING_PROFILE,
  GET_ONE_COMPANY_SUCCESS,
  GET_ONE_COMPANY_ERROR,
  GET_COMPANY_USER_ERROR,
  GET_COMPANY_USER_SUCCESS,
  SUCCESS_EDITING_USER_ROLE,
  ERROR_EDITING_USER_ROLE,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  CREATE_PRICE_SUCCESS,
  CREATE_PRICE_ERROR
} = constants;

const {
  getAllUserByCompanyId, updateUserRole, deleteUserById, updateUserRoleToManager
} = UserService;
const { getAllCompany, updateCompanyById, getCompanyById } = CompanyService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the company.
 *
 * @class CompanyController
 */
class CompanyController {
  /**
   * Controllers used for adding companies
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

  /**
   * Controllers used for getting all companies
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof CompanyController
   */
  static async fetchAllCompany(req, res, next) {
    try {
      const data = await getAllCompany();
      return successResponse(res, {
        message: GET_ALL_COMPANY_SUCCESS,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: GET_ALL_COMPANY_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: GET_ALL_COMPANY_ERROR }));
      throw dbError;
    }
  }

  /**
   * Updates a Company's profile.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the Company's details and.
   * @memberof  CompanyController
   */
  static async updateCompanyProfile(req, res, next) {
    try {
      const company = await getCompanyById(req.params.companyId);
      const data = await updateCompanyById(company, req.body);
      return successResponse(res, {
        message: UPDATE_COMPANY_PROFILE_SUCCESSFULLY,
        data
      });
    } catch (e) {
      next(new ApiError({ message: ERROR_UPDATING_PROFILE }));
    }
  }

  /**
   * get a Company's profile.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the Company's details and.
   * @memberof  CompanyController
   */
  static async getCompanyProfile(req, res, next) {
    try {
      const data = await getCompanyById(req.params.companyId);
      return successResponse(res, {
        message: GET_ONE_COMPANY_SUCCESS,
        data
      });
    } catch (e) {
      next(new ApiError({ message: GET_ONE_COMPANY_ERROR }));
    }
  }

  /**
   * get a Company user's profiles.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the Company's details and.
   * @memberof  CompanyController
   */
  static async getCompanyUserProfile(req, res, next) {
    try {
      const data = await getAllUserByCompanyId(req.params.companyId);
      return successResponse(res, {
        message: GET_COMPANY_USER_SUCCESS,
        data
      });
    } catch (e) {
      next(new ApiError({ message: GET_COMPANY_USER_ERROR }));
    }
  }

  /**
   * update user role in a Company.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the Company's details and.
   * @memberof  CompanyController
   */
  static async editCompanyUserRole(req, res, next) {
    try {
      if (req.body.role === 'basic') {
        await updateUserRole(req.params.userId, req.body);
      } else {
        await updateUserRoleToManager(req.params.userId, req.body.role);
      }
      return successResponse(res, {
        message: SUCCESS_EDITING_USER_ROLE
      });
    } catch (e) {
      next(new ApiError({ message: ERROR_EDITING_USER_ROLE }));
    }
  }

  /**
   * delete user profile in a Company.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the Company's details and.
   * @memberof  CompanyController
   */
  static async deleteUserFromCompany(req, res, next) {
    try {
      await deleteUserById(req.params.userId);
      return successResponse(res, {
        message: DELETE_USER_SUCCESS
      });
    } catch (e) {
      next(new ApiError({ message: DELETE_USER_ERROR }));
    }
  }

  /**
   * Controllers used for adding companies
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof CompanyController
   */
  static async addPrice(req, res, next) {
    try {
      const Price = new PriceModel({
        ...req.body, ...req.params
      });
      const { id } = await Price.save();
      return successResponse(res, {
        message: CREATE_PRICE_SUCCESS,
        data: { id, ...Price }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_PRICE_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_PRICE_ERROR }));
      throw dbError;
    }
  }
}

export default CompanyController;
