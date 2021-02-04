/**
 *Contains TankDataHelper methods
 *
 * @class TankDataHelper
 */
export default class TankDataHelper {
  /**
   * It generates an average of an array.
   * @static
   * @private
   * @param { Array } data - data to be processed
   * @memberof TankDataHelper
   * @returns {String} - A unique string.
   */
  static getAverage(data) {
    const total = data.reduce((a, b) => (a + b), 0);
    return total / data.length;
  }

  /**
   * It generates a mode of an array.
   * @static
   * @private
   * @param { Array } data - data to be processed
   * @memberof TankDataHelper
   * @returns {number} - A unique number.
   */
  static getMode(data) {
    return data < 2 ? data[0] : TankDataHelper.getAverage(data);
  }

  /**
   * It generates a mode of an array.
   * @static
   * @param { Array } numbers - data to be processed
   * @memberof TankDataHelper
   * @returns {String} - A unique string.
   */
  static calcMode(numbers) {
    const count = [];
    let maxIndex = 0;
    const numberArray = TankDataHelper.filterOutliers(numbers);
    // eslint-disable-next-line no-console
    console.log('PROCESSED DISTANCE', numberArray);
    numberArray.forEach((el) => {
      count[el] = (count[el] || 0) + 1;
      if (count[el] > maxIndex) {
        maxIndex = count[el];
      }
    });
    const foundModeArray = TankDataHelper.findExactMode(count, maxIndex);
    return TankDataHelper.getMode(foundModeArray) / 100;
  }

  /**
   * It generates a mode of an array.
   * @static
   * @private
   * @param { Array } count - data to be processed
   * @param { Number } maxIndex - maximum index
   * @memberof TankDataHelper
   * @returns {String} - A unique string.
   */
  static findExactMode(count, maxIndex) {
    const modes = [];
    count.forEach((el, index) => {
      if (count.includes(el)) {
        if (el === maxIndex) {
          modes.push(Number(index));
        }
      }
    });
    return modes;
  }

  /**
   * It filters outliers.
   * @static
   * @private
   * @param { Array } data - data to be processed
   * @memberof TankDataHelper
   * @returns {Array} - A unique array.
   */
  static filterOutliers(data) {
    return data.filter(el => el > 0 && el <= 400);
  }
}
