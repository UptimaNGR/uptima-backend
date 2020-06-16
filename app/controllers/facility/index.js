import { FacilityModel } from '../../models';
import FacilityService from '../../services/facility';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { getFacilityById, updateFacilityById } = FacilityService;
const {
  CREATE_FACILITY_ERROR,
  CREATE_FACILITY_SUCCESS,
  FETCH_FACILITIES_SUCCESSFULLY,
  ERROR_FETCHING_FACILITIES,
  SUCCESSFULLY_UPDATED_FACILITY,
  ERROR_UPDATING_DEVICE,
  FETCH_FACILITY_SUCCESSFULLY,
  FACILITY_NOT_FOUND
} = constants;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the Facility.
 *
 * @class FacilityController
 */
class FacilityController {
  /**
   * Controllers used for adding Facility details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Facility added
   * @memberof FacilityController
   */
  static async addFacility(req, res, next) {
    try {
      const facility = new FacilityModel({
        ...req.body,
        ...req.params
      });
      const { id } = await facility.save();
      return successResponse(res, {
        message: CREATE_FACILITY_SUCCESS,
        data: { id, ...facility }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_FACILITY_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_FACILITY_ERROR }));
      throw dbError;
    }
  }

  /**
   * Controllers used for all existing facilities
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us messages
   * @memberof ContactUsController
   */
  static async fetchAllFacility(req, res, next) {
    try {
      const data = req.facility;
      return successResponse(res, {
        message: FETCH_FACILITIES_SUCCESSFULLY,
        data
      });
    } catch (e) {
      next(new ApiError({ message: ERROR_FETCHING_FACILITIES }));
    }
  }

  /**
   * Controllers used for updating single Facility details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Facility added
   * @memberof FacilityController
   */
  static async updateFacilityById(req, res, next) {
    try {
      const facility = await getFacilityById(req.params.facilityId);
      const data = await updateFacilityById(facility, req.body);
      return successResponse(res, {
        message: SUCCESSFULLY_UPDATED_FACILITY,
        data
      });
    } catch (error) {
      next(new ApiError({ message: ERROR_UPDATING_DEVICE }));
    }
  }

  /**
   * Controllers used for getting single Facility details
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Facility added
   * @memberof FacilityController
   */
  static async fetchFacilityById(req, res, next) {
    try {
      const data = await getFacilityById(req.params.facilityId);
      return successResponse(res, {
        message: FETCH_FACILITY_SUCCESSFULLY,
        data
      });
    } catch (error) {
      next(new ApiError({ message: FACILITY_NOT_FOUND }));
    }
  }
}

export default FacilityController;
