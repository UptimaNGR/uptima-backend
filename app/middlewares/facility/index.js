import FacilityService from '../../services/facility';
import { Helper, ApiError, constants } from '../../utils';
import validation from '../../validations/facility';

const { errorResponse } = Helper;
const { GENERIC_ERROR, FACILITY_NOT_FOUND, FACILITY_ID_ABSENT } = constants;
const { getFacilityByCompanyId, getFacilityById } = FacilityService;
/**
 * A collection of middleware methods used to validates
 * Facility requests.
 * @class FacilityMiddleware
 */
class FacilityMiddleware {
  /**
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   *
   */
  static async validateFacilityFields(req, res, next) {
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
   * Validates company request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   *
   */
  static async fetchFacilityBasedOnAccess(req, res, next) {
    try {
      const { facility_id } = req.data;
      if (facility_id) {
        const data = await getFacilityById(facility_id);
        req.facility = [data];
        return next();
      }
      const data = await getFacilityByCompanyId(req.params.companyId);
      req.facility = data;
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
   * Validates facility request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   *
   */
  static async checkFacilityById(req, res, next) {
    try {
      const data = await getFacilityById(req.params.facilityId);
      return data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: FACILITY_NOT_FOUND
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
   * Validates Facility request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof FacilityMiddleware
   *
   */
  static async checkIfFacilityIdPresent(req, res, next) {
    try {
      const data = req.params.facilityId;
      if (data.length === 36) {
        return next();
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: FACILITY_ID_ABSENT
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

export default FacilityMiddleware;
