import { Helper, ApiError } from '../../utils';
import validation from '../../validations/device';

const { errorResponse } = Helper;

/**
 * A collection of middleware methods used to validates
 * device requests.
 * @class DeviceMiddleware
 */
class DeviceMiddleware {
  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof DeviceMiddleware
   *
   */
  static async validateDeviceFields(req, res, next) {
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
}

export default DeviceMiddleware;