import { Helper, ApiError, constants } from '../../utils';
import validation from '../../validations/contact.us';

const { errorResponse } = Helper;

/**
 * A collection of middleware methods used to validates
 * contact us requests.
 * @class ContactUsMiddleware
 */
class ContactUsMiddleware {
  /**
   * Validates contact request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ContactUsMiddleware
   *
   */
  static async validateContactUsFields(req, res, next) {
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
   * Checks that the facility type value is one of the valid types on the app.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @memberof ContactUsMiddleware
   * @returns { JSON | Null } - Returns error response if validation fails
   * or fires the next function if otherwise.
   */
  static facilityTypeValueValidator(req, res, next) {
    const { facilityType } = req.body;
    return facilityType.every(e => constants.FACILITY_TYPE_ARRAY.includes(e))
      ? next()
      : errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: constants.INVALID_TYPE_PARAMETER
        })
      );
  }
}

export default ContactUsMiddleware;
