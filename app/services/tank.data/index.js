import queries from '../../db/queries/tank.data';
import db from '../../db';
import { Helper } from '../../utils';

const {
  fetchTankSurfaceAreaByDeviceId,
  getSingleTankDataCurrentDay,
  getSingleTankDataDaily,
  getLastVolumeLeft
} = queries;

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
  static async calcVolumeByDeviceId({
    serialNumber,
    distance,
    longitude,
    latitude
  }) {
    const {
      surface_area,
      company_id,
      tank_id,
      total_volume,
      facility_id
    } = await db.oneOrNone(fetchTankSurfaceAreaByDeviceId, [serialNumber]);
    const lastVolume = await db.oneOrNone(getLastVolumeLeft, [
      serialNumber
    ]);
    const volume = calcVolume(surface_area, distance);
    const volumeLeft = total_volume - volume;
    const volumeUsed = lastVolume ? lastVolume.volume_left - volumeLeft : volume;
    return {
      serialNumber,
      company_id,
      tank_id,
      volumeLeft,
      volumeUsed,
      longitude,
      latitude,
      facility_id
    };
  }

  /**
   * Fetches a TankData by tank id for the day
   * @memberof TankDataService
   * @param {string} tankId - id of the Tank
   * @param {string} on - filter for tank data
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static getTankDataByTankIdDaily(tankId, on) {
    return on
      ? db.manyOrNone(getSingleTankDataDaily, [tankId, on])
      : db.manyOrNone(getSingleTankDataCurrentDay, [tankId]);
  }
}

export default TankDataService;
