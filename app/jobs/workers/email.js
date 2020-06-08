import EmailService from '../../services/email';

const { newPassword, contactUsMsg } = EmailService;

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
}
