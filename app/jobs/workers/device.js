import DeviceService from '../../services/device';

const { getDeviceByInactivity } = DeviceService;

/**
 * A collection of worker methods tha handles event related to Device.
 *
 * @class DeviceWorker
 */
export default class DeviceWorker {
  /**
   * Handles the tasks that should be carried out whenever a new user is created.
   * @static
   * @memberof EmailWorker
  //  * @param { null } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendInactiveDevice(done) {
    try {
      await getDeviceByInactivity();
      done();
    } catch (error) {
      done(error);
    }
  }
}
