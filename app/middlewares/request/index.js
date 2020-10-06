import expansionSchema from '../../validations/expansion';
import complaintSchema from '../../validations/complaint';
import { Helper, ApiError } from '../../utils';

const { errorResponse } = Helper;
/**
 * A collection of middleware methods used to verify the authenticity
 * of requests through protected routes.
 *
 * @class AuthMiddleware
 */
class RequestMiddleware {
  /**
   * Validates expansion request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof RequestMiddleware
   *
   */
  static async validateExpansionFields(req, res, next) {
    try {
      await expansionSchema.validateAsync(req.body);
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
   * Validates complaint request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof RequestMiddleware
   *
   */
  static async validateComplaintFields(req, res, next) {
    try {
      await complaintSchema.validateAsync(req.body);
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default RequestMiddleware;
