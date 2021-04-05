import { DeviceModel } from '../../models';
import DeviceService from '../../services/device';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const {
  CREATE_DEVICE_SUCCESS,
  CREATE_DEVICE_ERROR,
  UPDATE_DEVICE_SUCCESSFULLY,
  ERROR_UPDATING_DEVICE,
  ERROR_FETCHING_DEVICE,
  FETCH_DEVICE_SUCCESSFULLY
} = constants;

const { updateDeviceById, getDeviceById } = DeviceService;

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
        ...req.body,
        ...req.params
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
    }
  }

  /**
   * Controllers used for getting single Device details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Device added
   * @memberof DeviceController
   */
  static async fetchDeviceById(req, res, next) {
    try {
      const data = await getDeviceById(req.params.deviceId);
      return successResponse(res, {
        message: FETCH_DEVICE_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_FETCHING_DEVICE,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_FETCHING_DEVICE }));
    }
  }

  /**
   * Controllers used for updating single Device details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Device added
   * @memberof DeviceController
   */
  static async updateDeviceById(req, res, next) {
    try {
      const device = await getDeviceById(req.params.deviceId);
      const data = await updateDeviceById(device, req.body);
      return successResponse(res, {
        message: UPDATE_DEVICE_SUCCESSFULLY,
        data
      });
    } catch (error) {
      const dbError = new DBError({
        status: ERROR_UPDATING_DEVICE,
        message: error.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: ERROR_UPDATING_DEVICE }));
    }
  }
}

export default DeviceController;
