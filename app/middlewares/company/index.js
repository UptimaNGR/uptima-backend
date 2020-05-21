import { Helper, ApiError } from '../../utils';
import validation from '../../validations/company';
import CompanyServices from '../../services/company';

const { getCompanyByEmail, getCompanyByPhone } = CompanyServices;

const { errorResponse } = Helper;

/**
 * A collection of middleware methods used to validates
 * contact us requests.
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
      const data = await getCompanyByEmail(req.body.email);
      return data
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: 'Email registered already'
          })
        )
        : next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: 'failed to verify email'
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
      const data = await getCompanyByEmail(req.body.phoneNumber);
      return data
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: 'Phone number registered already'
          })
        )
        : next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: 'failed to verify email'
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default CompanyMiddleware;
