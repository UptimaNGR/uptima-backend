import { Helper, ApiError, constants } from '../../utils';
import DeviceService from '../../services/device';

const { getDeviceBySerialNumber } = DeviceService;
const { errorResponse } = Helper;
const { SERIAL_NUMBER_NOT_FOUND, GENERIC_ERROR } = constants;

/**
 * A collection of middleware methods used to validates
 * tank data requests.
 * @class TankDataMiddleware
 */
class TankDataMiddleware {
  /**
   * Validates Tank request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async fetchDeviceBySerialNumber(req, res, next) {
    try {
      const data = await getDeviceBySerialNumber(req.query.serialNumber);
      return data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: SERIAL_NUMBER_NOT_FOUND
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

export default TankDataMiddleware;
