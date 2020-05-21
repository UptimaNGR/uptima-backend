// import { loginSchema } from '../../validations/auth';
import { Helper, genericErrors, constants, ApiError } from '../../utils';
// import StaffService from '../../services/staff';

// const { fetchByEmail } = StaffService;
const { errorResponse, verifyToken } = Helper;
const { EMAIL_CONFLICT, STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG } = constants;

/**
 * A collection of middleware methods used to verify the authenticity
 * of requests through protected routes.
 *
 * @class AuthMiddleware
 */
class AuthMiddleware {
  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @private
   * @param {object} authorization - The headers object
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization) {
      const token = authorization.split(' ')[1];
      bearerToken = token || authorization;
    }
    return bearerToken;
  }

  /**
   * Aggregates a search for the access token in a number of places.
   * @static
   * @private
   * @param {Request} req - The express request object.
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization }
    } = req;
    const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization);
    return (
      bearerToken
      || req.headers['x-access-token']
      || req.headers.token
      || req.body.token
    );
  }

  /**
   * Validates user's login credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  // static async validateLoginFields(req, res, next) {
  //   try {
  //     await loginSchema.validateAsync(req.body);
  //     next();
  //   } catch (error) {
  //     errorResponse(req, res, genericErrors.inValidLogin);
  //   }
  // }

  /**
   * Checks if a specific already exist for a staff account.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async signUpEmailValidator(req, res, next) {
    try {
      // const staff = await fetchByEmail(req.body.email);
      const de = true;
      if (de) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 409,
            message: EMAIL_CONFLICT
          })
        );
      }
      next();
    } catch (e) {
      e.status = constants.STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
      );
    }
  }

  /**
   * Validates staff's login credentials, with emphasis on the
   * existence of a user with the provided email address.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async StaffLoginEmailvalidator(req, res, next) {
    try {
      // const staff = await fetchByEmail(req.body.email);
      const staff = true;
      if (!staff) {
        return errorResponse(req, res, genericErrors.inValidLogin);
      }
      req.user = staff;
      next();
    } catch (e) {
      e.status = constants.STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
      );
    }
  }

  /**
   * Verifies the validity of a user's access token or and the presence of it.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static authenticate(req, res, next) {
    const token = AuthMiddleware.checkToken(req);
    if (!token) {
      return errorResponse(req, res, genericErrors.authRequired);
    }
    try {
      const decoded = verifyToken(token);
      req.data = decoded;
      next();
    } catch (err) {
      errorResponse(req, res, genericErrors.authRequired);
    }
  }

  /**
   * Generates password for staff and hashes it.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async generatePassword(req, res, next) {
    const { role } = req.body;
    if (role === 'staff') {
      next();
    } else {
      try {
        const password = Helper.generateUniquePassword();
        const { hash, salt } = await Helper.hashPassword(password);
        req.body.salt = salt;
        req.body.hash = hash;
        req.body.plainPassword = password;
        next();
      } catch (err) {
        errorResponse(req, res, genericErrors.authRequired);
      }
    }
  }
}

export default AuthMiddleware;
