import { FacilityModel } from '../../models';
// import FacilityService from '../../services/Facility';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { CREATE_FACILITY_ERROR, CREATE_FACILITY_SUCCESS } = constants;

// const {} = FacilityService;

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
        ...req.body, ...req.params
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
}

export default FacilityController;