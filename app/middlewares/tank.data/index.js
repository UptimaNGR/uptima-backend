import { Helper, ApiError, constants } from '../../utils';
import DeviceService from '../../services/device';
import TankDataService from '../../services/tank.data';
import TankService from '../../services/tank';
import Job from '../../jobs';
import UserService from '../../services/user';
import FacilityService from '../../services/facility';

const { getDeviceBySerialNumber } = DeviceService;
const { errorResponse } = Helper;
const {
  SERIAL_NUMBER_NOT_FOUND,
  GENERIC_ERROR,
  events: { SEND_MIN_LEVEL_ALERT, SEND_ACTIVITY_DURING_CLOSE }
} = constants;
const {
  calcTankDetailsByDeviceSn,
  calcVolumeUsed,
  getLastFilledTimeDataByTankId,
  getLastVolumeDataByTankId,
  getPriceByCompanyIdAndFluidType
} = TankDataService;
const { getTankById } = TankService;
const { getUserByFacilityId } = UserService;
const { getFacilityCloseAndOpenTimeById } = FacilityService;

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
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async fetchDeviceBySerialNumber(req, res, next) {
    try {
      const device = await getDeviceBySerialNumber(req.body.serialNumber);
      return device
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

  /**
   * Checks if minimum level for alert is reached.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async checkMinLevel(req, res, next) {
    try {
      const { volumeLeft, volumeUsed, facility_id, tank_id } = req.tank;
      const { min_level } = await getTankById(tank_id);
      if (volumeLeft < min_level) {
        const { email, first_name } = await getUserByFacilityId(facility_id);
        Job.create({
          type: SEND_MIN_LEVEL_ALERT,
          data: { email, first_name, min_level, volumeLeft, volumeUsed }
        });
      }
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Checks if minimum level for alert is reached.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async checkOperationTime(req, res, next) {
    try {
      const { opening_time, closing_time, hour } = req.time;
      if (!opening_time) {
        return next();
      }
      const { facility_id, volumeUsed, volumeLeft } = req.tank;
      if (volumeUsed > 5 && (hour < opening_time || hour > closing_time)) {
        const { email, first_name } = await getUserByFacilityId(facility_id);
        Job.create({
          type: SEND_ACTIVITY_DURING_CLOSE,
          data: { email, first_name, volumeUsed, volumeLeft }
        });
      }
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Checks if minimum level for alert is reached.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async checkVolume(req, res, next) {
    try {
      const {
        structure_type,
        surface_area,
        distance,
        height,
        total_volume,
        serialNumber
      } = req.tank;
      const { volumeLeft, volumeUsed } = await calcVolumeUsed(
        structure_type,
        surface_area,
        distance,
        height,
        total_volume,
        serialNumber
      );
      req.tank.volumeLeft = volumeLeft;
      req.tank.volumeUsed = volumeUsed;
      return next();
    } catch (error) {
      errorResponse(req, res, error);
    }
  }

  /**
   * Checks if minimum level for alert is reached.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async checkTank(req, res, next) {
    try {
      const date = new Date();
      const hour = date.getHours();
      const tank = await calcTankDetailsByDeviceSn(req.body);
      const data = await getPriceByCompanyIdAndFluidType(tank.company_id, tank.fluid_type);
      const {
        opening_time,
        closing_time
      } = await getFacilityCloseAndOpenTimeById(tank.facility_id);
      req.tank = tank;
      req.tank.price = data.amount;
      req.time = { opening_time, closing_time, hour };
      return next();
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Gets static data for dashboard
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof TankDataMiddleware
   *
   */
  static async getStaticData(req, res, next) {
    try {
      const { tankId } = req.params;
      const data = await Promise.all([
        getLastFilledTimeDataByTankId(tankId),
        getLastVolumeDataByTankId(tankId)
      ]);
      req.staticData = {
        lastFilledTime: data[0] ? data[0].created_at : 'N/A',
        currentVolume: data[1] ? data[1].volume_left : 'N/A'
      };
      next();
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
