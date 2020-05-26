import { TankDataModel } from '../../models';
import TankDataService from '../../services/tank.data';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_TANK_DATA_ERROR,
  TANK_DATA_CREATED_SUCCESSFULLY
} = constants;

const { calcVolumeByDeviceId } = TankDataService;

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
      const volume = await calcVolumeByDeviceId(req.query);
      const tankData = new TankDataModel({
        ...volume
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
}

export default TankDataController;
