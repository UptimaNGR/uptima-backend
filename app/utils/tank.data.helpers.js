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
    return data.reduce((a, b) => (a + b) / data.length);
  }

  /**
   * It generates a mode of an array.
   * @static
   * @private
   * @param { Array } data - data to be processed
   * @memberof TankDataHelper
   * @returns {String} - A unique string.
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
    let i;
    let number;
    let maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
      number = numbers[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }
    const foundModeArray = TankDataHelper.findExactMode(count, maxIndex);

    return TankDataHelper.getMode(foundModeArray) / 100;
  }

  /**
   * It generates a mode of an array.
   * @static
   * @private
   * @param { Array } data - data to be processed
   * @memberof TankDataHelper
   * @returns {String} - A unique string.
   */
  static getDifferenceMode(data) {
    const differences = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data.length > i + 1) {
        differences.push(Math.abs(data[i + 1] - data[i]));
      }
      if (data.length - 1 === i) {
        differences.push(Math.abs(data[i - 1] - data[i]));
      }
    }
    return TankDataHelper.calcMode(differences);
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
}
