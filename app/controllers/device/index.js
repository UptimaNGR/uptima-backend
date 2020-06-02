import { DeviceModel } from '../../models';
// import TankService from '../../services/tank';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { CREATE_DEVICE_SUCCESS, CREATE_DEVICE_ERROR } = constants;

// const {} = DeviceService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the Device.
 *
 * @class DeviceController
 */
class DeviceController {
  /**
   * Controllers used for adding Device details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Device added
   * @memberof DeviceController
   */
  static async addDevice(req, res, next) {
    try {
      const device = new DeviceModel({
        ...req.body, ...req.params
      });
      const newDevice = await device.save();
      return successResponse(res, {
        message: CREATE_DEVICE_SUCCESS,
        data: { ...newDevice }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_DEVICE_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_DEVICE_ERROR }));
      throw dbError;
    }
  }
}

export default DeviceController;
