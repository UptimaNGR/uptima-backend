import { Helper, ApiError, constants } from '../../utils';
import validation from '../../validations/company';
import CompanyServices from '../../services/company';

const {
  getCompanyByEmail,
  getCompanyByPhone,
  getCompanyById
} = CompanyServices;

const { errorResponse } = Helper;
const {
  PHONE_ERROR,
  EMAIL_CONFLICT,
  GENERIC_ERROR,
  COMPANY_NOT_FOUND,
  COMPANY_ID_ABSENT
} = constants;

/**
 * A collection of middleware methods used to validates
 * company requests.
 * @class CompanyMiddleware
 */
class CompanyMiddleware {
  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof CompanyMiddleware
   *
   */
  static async validateCompanyFields(req, res, next) {
    try {
      await validation.validateAsync(req.body);
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof CompanyMiddleware
   *
   */
  static async checkCompanyEmailData(req, res, next) {
    try {
      const email = await getCompanyByEmail(req.body.email);
      return email
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: EMAIL_CONFLICT
          })
        )
        : next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof CompanyMiddleware
   *
   */
  static async checkCompanyPhoneData(req, res, next) {
    try {
      const phone = await getCompanyByPhone(req.body.phoneNumber);
      return phone
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: PHONE_ERROR
          })
        )
        : next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof CompanyMiddleware
   *
   */
  static async checkCompanyIdData(req, res, next) {
    try {
      const data = await getCompanyById(req.params.companyId);
      return data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: COMPANY_NOT_FOUND
          })
        );
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof CompanyMiddleware
   *
   */
  static async checkIfCompanyIdPresent(req, res, next) {
    try {
      const data = req.params.companyId;
      if (data.length === 36) {
        return next();
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: COMPANY_ID_ABSENT
        })
      );
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default CompanyMiddleware;
