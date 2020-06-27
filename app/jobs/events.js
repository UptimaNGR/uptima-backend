import { constants } from '../utils';
import EmailWorker from './workers/email';

const {
  events: {
    SEND_PASSWORD_TO_EMAIL,
    SEND_CONTACT_US_MSG,
    SEND_FORGOT_PASSWORD_TO_EMAIL
  }
} = constants;

export default (queue) => {
  queue.process(SEND_PASSWORD_TO_EMAIL, EmailWorker.sendPassword);
  queue.process(SEND_CONTACT_US_MSG, EmailWorker.sendContactUsMsg);
  queue.process(SEND_FORGOT_PASSWORD_TO_EMAIL, EmailWorker.sendForgotPassword);
};
