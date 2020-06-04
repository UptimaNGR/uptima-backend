import { constants } from '../utils';
import EmailWorker from './workers/email';

const {
  events: { SEND_PASSWORD_TO_EMAIL }
} = constants;

export default (queue) => {
  queue.process(SEND_PASSWORD_TO_EMAIL, EmailWorker.sendEmail);
};
