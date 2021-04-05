import DeviceService from '../../services/device';
import { Helper, ApiError, constants } from '../../utils';
import validation from '../../validations/device';

const { errorResponse } = Helper;
const {
  GENERIC_ERROR,
  TANK_DEVICE_ERROR,
  SERIAL_NUMBER_ERROR,
  DEVICE_ID_ABSENT,
  RESOURCE_EXIST_VERIFICATION_FAIL
} = constants;
const { getDeviceByTankId, getDeviceBySerialNumber } = DeviceService;

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

  /**
   * checks device serial number in db.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof DeviceMiddleware
   *
   */
  static async checkIfSerialNumberExists(req, res, next) {
    try {
      const deviceSerial = await getDeviceBySerialNumber(req.body.serialNumber);
      return deviceSerial
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: SERIAL_NUMBER_ERROR
          })
        )
        : next();
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('DEVICE_SN');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * checks device serial number in db.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof DeviceMiddleware
   *
   */
  static async checkIfTankHasDevice(req, res, next) {
    try {
      const data = await getDeviceByTankId(req.params.tankId);
      return data
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: TANK_DEVICE_ERROR
          })
        )
        : next();
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('TANK_HAS_DEVICE');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates Device request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof DeviceMiddleware
   *
   */
  static async checkIfDeviceIdPresent(req, res, next) {
    try {
      const data = req.params.deviceId;
      if (data.length === 36) {
        return next();
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: DEVICE_ID_ABSENT
        })
      );
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('DEVICE_ID_PARAM');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default DeviceMiddleware;
