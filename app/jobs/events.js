import { constants } from '../utils';
import EmailWorker from './workers/email';

const {
  events: { SEND_PASSWORD_TO_EMAIL, SEND_CONTACT_US_MSG }
} = constants;

export default (queue) => {
  queue.process(SEND_PASSWORD_TO_EMAIL, EmailWorker.sendPassword);
  queue.process(SEND_CONTACT_US_MSG, EmailWorker.sendContactUsMsg);
};
