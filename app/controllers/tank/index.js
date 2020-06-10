import { TankModel } from '../../models';
import TankService from '../../services/tank';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_TANK_ERROR,
  CREATE_TANK_SUCCESS,
  ERROR_FETCHING_TANK,
  FETCH_TANK_SUCCESSFULLY
} = constants;

const { getTankByFacilityId } = TankService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the Tank.
 *
 * @class TankController
 */
class TankController {
  /**
   * Controllers used for adding tank details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankController
   */
  static async addTank(req, res, next) {
    try {
      const tank = new TankModel({
        ...req.body,
        ...req.params
      });
      const { id } = await tank.save();
      return successResponse(res, {
        message: CREATE_TANK_SUCCESS,
        data: { id, ...tank }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_TANK_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_TANK_ERROR }));
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
   * @memberof TankController
   */
  static async fetchTankByFacilityId(req, res, next) {
    try {
      const { facilityId } = req.params;
      const data = await getTankByFacilityId(facilityId);
      return successResponse(res, {
        message: FETCH_TANK_SUCCESSFULLY,
        data
      });
    } catch (error) {
      next(new ApiError({ message: ERROR_FETCHING_TANK }));
    }
  }
}

export default TankController;
