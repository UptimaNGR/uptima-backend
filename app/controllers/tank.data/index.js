import { TankDataModel } from '../../models';
import TankDataService from '../../services/tank.data';
import FacilityService from '../../services/facility';
import { Helper, constants, ApiError, DBError } from '../../utils';
import compute from '../../../process';

const { successResponse } = Helper;
const {
  CREATE_TANK_DATA_ERROR,
  TANK_DATA_CREATED_SUCCESSFULLY,
  ERROR_FETCHING_TANK_DATA,
  FETCH_TANK_DATA_SUCCESSFULLY
} = constants;

const { getTankDataByTankIdDaily } = TankDataService;
const { getFacilityById } = FacilityService;
/**
 * A collection of methods that controls the success response
 * for CRUD operations on the contact us.
 *
 * @class TankDataController
 */
class TankDataController {
  /**
   * Controllers used for adding tank data resource
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank data added
   * @memberof TankDataController
   */
  static async addTankData(req, res, next) {
    try {
      // const volume = await calcVolumeByDeviceId(req.body);
      const tankData = new TankDataModel({
        ...req.tank
      });
      const { id } = await tankData.save();
      return successResponse(res, {
        message: TANK_DATA_CREATED_SUCCESSFULLY,
        data: { id, ...tankData }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_TANK_DATA_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_TANK_DATA_ERROR }));
      throw dbError;
    }
  }

  /**
   * Controllers used for adding tank details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankDataController
   */
  static async fetchTankDataByTankIdDaily(req, res, next) {
    try {
      const { facility_type } = await getFacilityById(req.params.facilityId);
      const data = await getTankDataByTankIdDaily(
        req.params.tankId,
        req.query.on
      );
      if (facility_type !== 'tanker') {
        return successResponse(res, {
          message: FETCH_TANK_DATA_SUCCESSFULLY,
          data
        });
      }
      const mappedData = { data };
      const mapData = await compute(mappedData);
      successResponse(res, {
        message: FETCH_TANK_DATA_SUCCESSFULLY,
        data: JSON.parse(mapData)
      });
    } catch (error) {
      next(new ApiError({ message: ERROR_FETCHING_TANK_DATA }));
    }
  }
}

export default TankDataController;
