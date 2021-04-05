import { ContactUsModel, ContactUsHomepageModel } from '../../models';
import ContactUsService from '../../services/contact.us';
import { Helper, constants, ApiError, DBError } from '../../utils';
import Job from '../../jobs';

const { successResponse } = Helper;
const {
  CONTACT_US_MSG_CREATED_ERROR,
  CONTACT_US_MSG_CREATED_SUCCESSFULLY,
  FETCH_CONTACT_US_MSG_SUCCESSFULLY,
  FETCH_CONTACT_US_MSG_ERROR,
  events: { SEND_CONTACT_US_MSG }
} = constants;

const { getAllContactUsMsg } = ContactUsService;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the contact us.
 *
 * @class ContactUsController
 */
class ContactUsController {
  /**
   * Controllers used for adding contact us messages
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof ContactUsController
   */
  static async addContactUs(req, res, next) {
    try {
      const contactUs = new ContactUsModel({
        ...req.body
      });
      const { id } = await contactUs.save();
      Job.create({ type: SEND_CONTACT_US_MSG, data: req.body });
      return successResponse(res, {
        message: CONTACT_US_MSG_CREATED_SUCCESSFULLY,
        data: { id, ...contactUs }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CONTACT_US_MSG_CREATED_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CONTACT_US_MSG_CREATED_ERROR }));
    }
  }

  /**
   * Controllers used for adding contact us messages
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us added
   * @memberof ContactUsController
   */
  static async addContactUsHomepage(req, res, next) {
    try {
      const contactUs = new ContactUsHomepageModel({
        ...req.body
      });
      const { id } = await contactUs.save();
      Job.create({ type: SEND_CONTACT_US_MSG, data: req.body });
      return successResponse(res, {
        message: CONTACT_US_MSG_CREATED_SUCCESSFULLY,
        data: { id, ...contactUs }
      });
    } catch (e) {
      const dbError = new DBError({
        status: CONTACT_US_MSG_CREATED_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: CONTACT_US_MSG_CREATED_ERROR }));
    }
  }

  /**
   * Controllers used for all existing contact us msgs
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the contact us messages
   * @memberof ContactUsController
   */
  static async fetchContactUs(req, res, next) {
    try {
      const data = await getAllContactUsMsg(req.query);
      return successResponse(res, {
        message: FETCH_CONTACT_US_MSG_SUCCESSFULLY,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: FETCH_CONTACT_US_MSG_ERROR,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: FETCH_CONTACT_US_MSG_ERROR }));
    }
  }
}

export default ContactUsController;
