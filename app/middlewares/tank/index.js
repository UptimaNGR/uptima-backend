import { Helper, ApiError, constants } from '../../utils';
import validation from '../../validations/tank';
import TankService from '../../services/tank';

const { getTankByFacilityIdAndSerialNumber, getTankById } = TankService;
const { errorResponse } = Helper;
const {
  TANK_VOLUME_ERROR,
  SERIAL_NUMBER_ERROR,
  TANK_NOT_FOUND,
  GENERIC_ERROR
} = constants;

/**
 * A collection of middleware methods used to validates
 * tank requests.
 * @class TankMiddleware
 */
class TankMiddleware {
  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankMiddleware
   *
   */
  static async validateTankFields(req, res, next) {
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
   * Calculates tank volume.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankMiddleware
   *
   */
  static async calcTotalTankVolume(req, res, next) {
    try {
      const { height, surfaceArea } = req.body;
      const totalVolume = height * surfaceArea;
      req.body.totalVolume = totalVolume;
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: TANK_VOLUME_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * check tank serial number in db.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankMiddleware
   *
   */
  static async checkIfSerialNumberExistsInFacility(req, res, next) {
    try {
      const data = await getTankByFacilityIdAndSerialNumber(
        req.params.facilityId,
        req.body.serialNumber
      );
      return data
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
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates Tank request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankMiddleware
   *
   */
  static async checkTankById(req, res, next) {
    try {
      const data = await getTankById(req.params.tankId);
      return data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: TANK_NOT_FOUND
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

export default TankMiddleware;
