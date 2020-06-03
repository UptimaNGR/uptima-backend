import { UserModel } from '../../models';
// import UserService from '../../services/User';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { successResponse } = Helper;
const { CREATE_USER_ERROR, CREATE_USER_SUCCESS } = constants;

// const {} = UserService;

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
}

export default UserController;
