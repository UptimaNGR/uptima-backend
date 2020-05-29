import queries from '../../db/queries/tank.data';
import db from '../../db';
import { Helper } from '../../utils';

const { fetchTankSurfaceAreaByDeviceId } = queries;

const { calcVolume } = Helper;

/**
 * Contains a collection of service methods for managing TankData resource on the app.
 * @class TankDataService
 *
 */
class TankDataService {
  /**
   * Fetches a TankData by id
   * @memberof TankDataService
   * @param {string} id - id of the TankData
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static getTankDataByDeviceId(id) {
    return db.oneOrNone(fetchTankSurfaceAreaByDeviceId, [id]);
  }

  /**
   * Calculates a Tank volume
   * @memberof TankDataService
   * @param {string} data - distance and deviceId
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with volume of Tank.
   */
  static async calcVolumeByDeviceId({ deviceId, distance }) {
    const {
      surface_area,
      company_id,
      tank_id,
      total_volume
    } = await db.oneOrNone(fetchTankSurfaceAreaByDeviceId, [deviceId]);
    const volumeUsed = await calcVolume(surface_area, distance);
    const volume = total_volume - volumeUsed;
    return { deviceId, company_id, tank_id, volume };
  }
}

export default TankDataService;