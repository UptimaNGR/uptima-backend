import { Helper, genericErrors, constants, ApiError } from '../../utils';

const { errorResponse } = Helper;


/**
 * A collection of middleware methods used to validates
 * access levels for protected resources based on membership and role.
 *
 * @class RoleMiddleware
 */
class RoleMiddleware {
  /**
    * Checks if the logged in user is the one requesting for the resource.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static ownerValidator(req, res, next) {
    return req.data.id === req.params.staffId
      ? next()
      : errorResponse(req, res, genericErrors.unAuthorized);
  }

  /**
    * Checks that the role value is one of the valid roles on the app.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static roleValueValidator(req, res, next) {
    return constants.ROLE_ARRAY.includes(req.body.role)
      ? next()
      : errorResponse(req, res, new ApiError({
        status: 400,
        message: constants.INVALID_ROLE_PARAMETER
      }));
  }

  /**
    * Checks if a logged in user is an admin.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static adminAccessValidator(req, res, next) {
    return req.data.is_admin
      ? next()
      : errorResponse(req, res, genericErrors.unAuthorized);
  }

  /**
    * Checks store admin does not attempt to remove a super admin.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static noStoreToSuperModify(req, res, next) {
    return req.data.role === 'store' && req.user.role === 'super'
      ? errorResponse(req, res, new ApiError({
        status: 403,
        message: constants.STORE_TO_SUPER_NOT_ALLOWED
      }))
      : next();
  }


  /**
    * Checks that a created super-admin isn't trying
    * to revoke the access of the app owner or any other super-admin.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static appOwnerSecureAccessValidator(req, res, next) {
    if (req.data.isOwner) {
      if (req.data.id === req.params.staffId) {
        return errorResponse(req, res, new ApiError({
          status: 403,
          message: constants.OWNER_REMOVAL_NOT_SUPPORTED
        }));
      }
    }
    if (!req.data.isOwner && req.data.role === req.user.role) {
      return errorResponse(req, res, new ApiError({
        status: 403,
        message: constants.ADMIN_TO_ADMIN_NOT_ALLOWED
      }));
    }
    next();
  }

  /**
    * Verifies that user has the required role access for the resource.
    * @static
    * @param { Array } roles - A list of roles that can access the resource.
    * @param { String } position - Where to look for the role value, defaults to data.
    * @memberof RoleMiddleware
    * @returns { Function } - Returns a middleware function.
    */
  static roleAccessValidator(roles, position = 'data') {
    return (req, res, next) => (roles.includes(req[position].role)
      ? next() : errorResponse(req, res, new ApiError({
        status: 403,
        message: constants.ROLE_NOT_SUFFICIENT
      })));
  }

  /**
    * Verifies that user has access to location
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Function } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static locationAccessValidator(req, res, next) {
    const { data: { role, location_id }, params: { locationId } } = req;
    return role === 'super' || location_id === locationId ? next()
      : errorResponse(req, res, new ApiError({
        status: 403,
        message: constants.ROLE_NOT_SUFFICIENT_LOCATION
      }));
  }
}

export default RoleMiddleware;
