import { Helper, ApiError, constants } from '../../utils';
import { userSchema, passwordSchema } from '../../validations/user';
import { updatePasswordEmailSchema } from '../../validations/auth';
import UserServices from '../../services/user';

const {
  getUserByEmail,
  getUserByPhone,
  getUserById,
  getUserByUsername
} = UserServices;

const { errorResponse } = Helper;
const {
  PHONE_ERROR,
  EMAIL_CONFLICT,
  GENERIC_ERROR,
  USER_NOT_FOUND,
  USERNAME_ERROR,
  RESOURCE_EXIST_VERIFICATION_FAIL
} = constants;

/**
 * A collection of middleware methods used to validates
 * User requests.
 * @class UserMiddleware
 */
class UserMiddleware {
  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async validateUserFields(req, res, next) {
    try {
      await userSchema.validateAsync(req.body);
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
   * Validates User password.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async validateUserPasswordField(req, res, next) {
    try {
      await passwordSchema.validateAsync(req.body.password);
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
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkUserEmailData(req, res, next) {
    try {
      const userEmail = await getUserByEmail(req.body.email);
      return userEmail
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: EMAIL_CONFLICT
          })
        )
        : next();
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('USER_EMAIL');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkUserPhoneData(req, res, next) {
    try {
      const userPhone = await getUserByPhone(req.body.phoneNumber);
      return userPhone
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: PHONE_ERROR
          })
        )
        : next();
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('USER_PHONE');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkUsernameData(req, res, next) {
    try {
      const data = await getUserByUsername(req.body.username.trim());
      return data
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: USERNAME_ERROR
          })
        )
        : next();
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('USERNAME');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates User request credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkUserIdData(req, res, next) {
    try {
      const data = await getUserById(req.params.userId);
      req.user = data;
      return data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 400,
            message: USER_NOT_FOUND
          })
        );
    } catch (error) {
      error.status = RESOURCE_EXIST_VERIFICATION_FAIL('USER_ID');
      Helper.moduleErrLogMessager(error);
      const apiError = new ApiError({
        status: 500,
        message: GENERIC_ERROR
      });
      errorResponse(req, res, apiError);
    }
  }

  /**
   * Validates user's email credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   *@returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async validateResetPasswordField(req, res, next) {
    try {
      await updatePasswordEmailSchema.validateAsync(req.body);
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message
      });
      errorResponse(req, res, apiError);
    }
  }
}

export default UserMiddleware;
