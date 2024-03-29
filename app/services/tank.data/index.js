import queries from '../../db/queries/tank.data';
import priceQuery from '../../db/queries/price';
import db from '../../db';
import { DeviceHelper } from '../../utils';

const {
  fetchTankSurfaceAreaByDeviceId,
  getSingleTankDataCurrentDay,
  getSingleTankDataDaily,
  getLastVolumeLeft,
  getLastTimeFilled,
  getLastVolumeLeftByTankId
} = queries;

const { calcVolumeLeftByTankType } = DeviceHelper;

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
   * Fetches a lastVolume by id
   * @memberof TankDataService
   * @param {string} tankId - id of the TankData
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static getLastVolumeDataByTankId(tankId) {
    return db.oneOrNone(getLastVolumeLeftByTankId, [tankId]);
  }

  /**
   * Fetches a last time filled by id
   * @memberof TankDataService
   * @param {string} tankId - id of the TankData
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static getLastFilledTimeDataByTankId(tankId) {
    return db.oneOrNone(getLastTimeFilled, [tankId]);
  }

  /**
   * Get Tank details for volume calculation
   * @memberof TankDataService
   * @param {string} data - distance and deviceId
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with volume of Tank.
   */
  static async calcTankDetailsByDeviceSn({
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
      facility_id,
      height,
      structure_type,
      fluid_type
    } = await db.oneOrNone(fetchTankSurfaceAreaByDeviceId, [serialNumber]);
    return {
      serialNumber,
      company_id,
      tank_id,
      surface_area,
      total_volume,
      longitude,
      latitude,
      facility_id,
      distance: parseFloat(distance),
      height,
      structure_type,
      fluid_type
    };
  }

  /**
   * Fetches a TankData by tank id for the day
   * @memberof TankDataService
   * @param {Number} type - type of the Tank
   * @param {Array} surface_area - surface for tank data
   * @param {Number} distance - distance of the Tank
   * @param {Number} height - height for tank data
   * @param {Number} total_volume - total tank volume
   * @param {Number} serialNumber - serial number of device
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static async calcVolumeUsed(
    type,
    surface_area,
    distance,
    height,
    total_volume,
    serialNumber
  ) {
    const volumeLeft = await calcVolumeLeftByTankType(
      type,
      surface_area,
      distance,
      height
    );
    const lastVolume = await db.oneOrNone(getLastVolumeLeft, [serialNumber]);
    const volumeUsed = lastVolume
      ? lastVolume.volume_left - volumeLeft
      : total_volume - volumeLeft;
    return {
      volumeLeft,
      volumeUsed
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

  /**
   * Fetches a price for tank data by company id
   * @memberof TankDataService
   * @param {string} companyId - id of the company
   * @param {string} fluidType - fluid type
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the TankData resource or a DB Error.
   */
  static getPriceByCompanyIdAndFluidType(companyId, fluidType) {
    return db.oneOrNone(priceQuery.fetchPriceByCompanyAndType, [companyId, fluidType]);
  }
}

export default TankDataService;
