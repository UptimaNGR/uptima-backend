import MailGun from 'mailgun-js';
import Mailgen from 'mailgen';

import { constants, ModuleError } from '../../utils';
import {
  contactUsMsgsTemplate,
  sendPassword,
  resetPassword,
  alertMinLevel,
  alertOutsideBizHours
} from './email.templates';
import config from '../../../config/env';

const mailGenerator = new Mailgen({
  theme: 'cerberus',
  product: {
    name: 'uptima solutions',
    link: 'https://uptima.ng',
    logo:
      'https://cdn.steemitimages.com/DQmVXnjB9tpz35dMtoRRoQvc8KimT1rsjZYisxvkiZqgeD9/White%20Logo%20.png'
  }
});
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
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static newPassword(
    { firstName, email, plainPassword },
    subject = 'Welcome to uptima uTrack dashboard'
  ) {
    const emailContent = mailGenerator.generate(
      sendPassword(firstName, plainPassword)
    );
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
    {
      name,
      email,
      phoneNumber,
      companyName,
      facilityType,
      numberOfTanks,
      message
    },
    subject = 'New contact us message'
  ) {
    const parameters = contactUsMsgsTemplate(
      name,
      email,
      phoneNumber,
      companyName,
      facilityType,
      numberOfTanks,
      message
    );
    const emailContent = mailGenerator.generate(parameters);
    return Email.send({ to: 'info@uptima.ng', subject, html: emailContent });
  }

  /**
   * Sends new password to user.
   * @static
   * @param {object} first_name - The Recipient's first-name.
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static forgotPassword(
    { firstName, email, link },
    subject = 'Password Reset'
  ) {
    const emailContent = mailGenerator.generate(resetPassword(firstName, link));
    return Email.send({ to: email, subject, html: emailContent });
  }

  /**
   * Sends alert user.
   * @static
   * @param {object} first_name - The Recipient's first-name.
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static alertMinVolumePassed(
    { first_name, email, volumeLeft, min_level, volumeUsed },
    subject = 'ALERT!!! MINIMUM VOLUME EXCEEDED'
  ) {
    const emailContent = mailGenerator.generate(
      alertMinLevel(first_name, volumeLeft, min_level, volumeUsed)
    );
    return Email.send({ to: email, subject, html: emailContent });
  }

  /**
   * Sends alert user.
   * @static
   * @param {object} first_name - The Recipient's first-name.
   * @param {string} subject - The subject of the email.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string
   * or an error object.
   */
  static alertActivityAfterClose(
    { first_name, email, volumeLeft, volumeUsed },
    subject = 'ALERT!!! OPERATION AFTER BUSINESS CLOSE'
  ) {
    const emailContent = mailGenerator.generate(
      alertOutsideBizHours(first_name, volumeLeft, volumeUsed)
    );
    return Email.send({ to: email, subject, html: emailContent });
  }
}
export default Email;
