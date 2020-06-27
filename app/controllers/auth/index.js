import { Helper, constants, genericErrors } from '../../utils';
import Job from '../../jobs';

const {
  LOGIN_USER_SUCCESSFULLY,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  events: { SEND_FORGOT_PASSWORD_TO_EMAIL }
} = constants;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on auth.
 *
 * @class AuthController
 */
class AuthController {
  /**
   * Logs in a user.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof AuthController
   */
  static async signIn(req, res) {
    const { user, body } = req;
    const isAuthenticUser = Helper.compareHash(
      body.password,
      user.password,
      user.salt
    );
    if (!isAuthenticUser) {
      return Helper.errorResponse(req, res, genericErrors.inValidLogin);
    }
    if (user.role === 'basic') {
      const data = Helper.addTokenToData(user, false);
      Helper.successResponse(res, {
        data,
        message: LOGIN_USER_SUCCESSFULLY
      });
    }
    const data = Helper.addTokenToData(user, true);
    Helper.successResponse(res, {
      data,
      message: LOGIN_USER_SUCCESSFULLY
    });
  }

  /**
   * reset password email.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof AuthController
   */
  static async resetPassword(req, res) {
    req.body.firstName = req.user;
    req.body.link = req.link;
    Job.create({ type: SEND_FORGOT_PASSWORD_TO_EMAIL, data: req.body });
    Helper.successResponse(res, {
      message: FORGOT_PASSWORD_REQUEST_SUCCESS
    });
  }
}

export default AuthController;
