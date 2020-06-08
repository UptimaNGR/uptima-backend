import { UserModel } from '../../models';
import UserService from '../../services/user';
import { Helper, constants, ApiError, DBError } from '../../utils';
import Job from '../../jobs';

const { successResponse } = Helper;
const {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  ERROR_UPDATING_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESSFULLY,
  events: { SEND_PASSWORD_TO_EMAIL }
} = constants;

const { updatePassword } = UserService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the User.
 *
 * @class UserController
 */
class UserController {
  /**
   * Controllers used for adding users
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof UserController
   */
  static async addUser(req, res, next) {
    try {
      const user = new UserModel({
        ...req.body
      });
      const { id } = await user.save();
      Job.create({ type: SEND_PASSWORD_TO_EMAIL, data: req.body });
      return successResponse(res, {
        message: CREATE_USER_SUCCESS,
        data: { id, ...user }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_USER_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CREATE_USER_ERROR }));
      throw dbError;
    }
  }

  /**
   * Updates a User's password.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof  UserController
   */
  static async updateUserPassword(req, res, next) {
    try {
      const data = await updatePassword(req.data.id, req.body.password);
      return successResponse(res, {
        message: UPDATE_USER_PASSWORD_SUCCESSFULLY,
        data
      });
    } catch (e) {
      next(new ApiError({ message: ERROR_UPDATING_PASSWORD }));
    }
  }
}

export default UserController;
