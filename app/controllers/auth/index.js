// import UserService from '../../services/user';
import { Helper, constants } from '../../utils';

// const { successResponse } = Helper;
// const { CREATE_COMPANY_ERROR, CREATE_COMPANY_SUCCESS } = constants;

// const {} = CompanyService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the company.
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
      return Helper.errorResponse(
        req,
        res,
        constants.genericErrors.inValidLogin
      );
    }
    if (user.role === 'basic') {
      const data = Helper.addTokenToData(user, false);
      Helper.successResponse(res, {
        data,
        message: constants.LOGIN_USER_SUCCESSFULLY
      });
    }
    const data = Helper.addTokenToData(user, true);
    Helper.successResponse(res, {
      data,
      message: constants.LOGIN_USER_SUCCESSFULLY
    });
  }
}

export default AuthController;
