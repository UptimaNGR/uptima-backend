import EmailService from '../../services/email';

const {
  newPassword,
  contactUsMsg,
  forgotPassword,
  alertMinVolumePassed,
  alertActivityAfterClose,
  distanceSentByDevice
} = EmailService;

/**
 * A collection of worker methods tha handles event related to email.
 *
 * @class EmailWorker
 */
export default class EmailWorker {
  /**
   * Handles the tasks that should be carried out whenever a new user is created.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendPassword({ data }, done) {
    try {
      await newPassword(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever a new contact us is created.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendContactUsMsg({ data }, done) {
    try {
      await contactUsMsg(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever a reset password is init.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendForgotPassword({ data }, done) {
    try {
      await forgotPassword(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever minimum level set is passed.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendAlertMinLevel({ data }, done) {
    try {
      await alertMinVolumePassed(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever there is an activity after
   *  business close.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendAlertOperationAfterClose({ data }, done) {
    try {
      await alertActivityAfterClose(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever there is an activity after
   *  business close.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendEmailToDele({ data }, done) {
    try {
      await distanceSentByDevice(data);
      done();
    } catch (error) {
      done(error);
    }
  }
}
