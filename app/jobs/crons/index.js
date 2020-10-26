import Job from '..';
import { constants } from '../../utils';

const initCron = () => {
  try {
    Job.createCron('*/1 * * * *', () => Job.create({ type: constants.events.CHECK_DEVICE_INACTIVITY }));
  } catch (error) {
    logger.info(error);
  }
};

export default initCron;
