import { TankModel } from '../../models';
import TankService from '../../services/tank';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_TANK_ERROR,
  CREATE_TANK_SUCCESS,
  ERROR_FETCHING_TANK,
  FETCH_TANK_SUCCESSFULLY,
  ERROR_UPDATING_TANK,
  UPDATE_TANK_SUCCESSFULLY,
  UPDATE_TANK_PRICE_SUCCESSFULLY
} = constants;

const {
  getTankByFacilityId,
  getTankById,
  updateTankById,
  updateTankPriceById
} = TankService;

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
    }
  }

  /**
   * Controllers used for getting tank details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankController
   */
  static async fetchTankByFacilityId(req, res, next) {
    try {
      const data = await getTankByFacilityId(req.params.facilityId);
      return successResponse(res, {
        message: FETCH_TANK_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_FETCHING_TANK,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_FETCHING_TANK }));
    }
  }

  /**
   * Controllers used for updating single tank details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankController
   */
  static async updateTankById(req, res, next) {
    try {
      const data = await updateTankById(req.params.tankId, req.body);
      return successResponse(res, {
        message: UPDATE_TANK_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_UPDATING_TANK,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_UPDATING_TANK }));
    }
  }

  /**
   * Controllers used for getting single tank details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankController
   */
  static async fetchTankById(req, res, next) {
    try {
      const data = await getTankById(req.params.tankId);
      return successResponse(res, {
        message: FETCH_TANK_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_FETCHING_TANK,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_FETCHING_TANK }));
    }
  }

  /**
   * Controller used for updating single tank price
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the tank added
   * @memberof TankController
   */
  static async updateTankPriceById(req, res, next) {
    try {
      const data = await updateTankPriceById(req.params.tankId, req.body);
      return successResponse(res, {
        message: UPDATE_TANK_PRICE_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_UPDATING_TANK,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_UPDATING_TANK }));
    }
  }
}

export default TankController;
