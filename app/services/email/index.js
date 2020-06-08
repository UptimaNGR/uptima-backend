import MailGun from 'mailgun-js';
import { constants, ModuleError } from '../../utils';
import {
  layout,
  newPasswordTemplate,
  contactUsMsgsTemplate
} from './email.templates';
import config from '../../../config/env';

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, UPTIMA_EMAIL } = config;

const { EMAIL_WAS_NOT_SENT } = constants;

const mailer = new MailGun({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
});

/**
 * It contains methods sending emails.
 *
 * @class Email
 */
class Email {
  /**
   * Sends emails through the mail client.
   * @static
   * @param {object} options - An object whose properties are used to configure the mail client.
   * @param {string} options.to - Recipient's email address.
   * @param {string} options.subject - The mail's subject.
   * @param {string} options.html - The message to be sent in html format.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static send(options) {
    const mailConfig = { ...options, from: UPTIMA_EMAIL };
    return new Promise((resolve, reject) => {
      mailer
        .messages()
        .send(mailConfig)
        .then(() => {
          resolve('success');
        })
        .catch((err) => {
          const moduleError = new ModuleError({
            message: err.message,
            status: EMAIL_WAS_NOT_SENT
          });
          reject(moduleError);
        });
    });
  }

  /**
   * Sends new password to user.
   * @static
   * @param {object} first_name - The Recipient's first-name.
  //  * @param {string} email - Recipient's email address.
  //  * @param {string} plainPassword - Email validation token.
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static newPassword(
    { firstName, email, plainPassword },
    subject = 'Welcome to ExpressPharmacy'
  ) {
    const emailContent = layout(firstName, newPasswordTemplate(plainPassword));
    return Email.send({ to: email, subject, html: emailContent });
  }

  /**
   * Sends new contact us.
   * @static
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static contactUsMsg(
    { name, email, phoneNumber, companyName, facilityType, numberOfTanks, message },
    subject = 'New contact us message'
  ) {
    const emailContent = layout(
      'Operator',
      contactUsMsgsTemplate(
        name,
        email,
        phoneNumber,
        companyName,
        facilityType,
        numberOfTanks,
        message
      )
    );
    return Email.send({ to: 'info@uptima.ng', subject, html: emailContent });
  }
}
export default Email;
