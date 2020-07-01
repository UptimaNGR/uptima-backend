import { constants } from '../utils';
import EmailWorker from './workers/email';
import DeviceWorker from './workers/device';

const {
  events: {
    SEND_PASSWORD_TO_EMAIL,
    SEND_CONTACT_US_MSG,
    SEND_FORGOT_PASSWORD_TO_EMAIL,
    SEND_MIN_LEVEL_ALERT,
    SEND_ACTIVITY_DURING_CLOSE,
    CHECK_DEVICE_INACTIVITY
  }
} = constants;

export default (queue) => {
  queue.process(SEND_PASSWORD_TO_EMAIL, EmailWorker.sendPassword);
  queue.process(SEND_CONTACT_US_MSG, EmailWorker.sendContactUsMsg);
  queue.process(SEND_FORGOT_PASSWORD_TO_EMAIL, EmailWorker.sendForgotPassword);
  queue.process(SEND_MIN_LEVEL_ALERT, EmailWorker.sendAlertMinLevel);
  queue.process(
    SEND_ACTIVITY_DURING_CLOSE,
    EmailWorker.sendAlertOperationAfterClose
  );
  queue.process(CHECK_DEVICE_INACTIVITY, DeviceWorker.sendInactiveDevice);
};
