import queries from '../../db/queries/tank';
import db from '../../db';
// import { Helper, DBError, constants } from '../../utils';

const {
  fetchTankById
} = queries;

// const { fetchResourceByPage, calcPages, moduleErrLogMessager } = Helper;

/**
 * Contains a collection of service methods for managing Tank resource on the app.
 * @class TankService
 *
 */
class TankService {
  /**
   * Fetches a Tank by id
   * @memberof TankService
   * @param {string} id - id of the tank
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Tank resource or a DB Error.
   */
  static getTankById(id) {
    return db.oneOrNone(fetchTankById, [id]);
  }
}

export default TankService;
