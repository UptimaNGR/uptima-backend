/**
 *Contains DeviceHelper methods
 *
 * @class DeviceHelper
 */
class DeviceHelper {
  /**
   * calculate volume left in a tank
   * @private
   * @static
   * @param { Array } surfaceArea - Total surface area of a tank.
   * @param { Number } height - The height to the tank.
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcTotalVolume(surfaceArea, height) {
    return surfaceArea[0] * height;
  }

  /**
   * calculate volume left in a tank
   * @private
   * @static
   * @param { Array } surfaceArea - Total surface area of a tank.
   * @param { Number } distance - The distance from sensor to device
   * @param { Number } height - The height to the tank.
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcVolumeLeft(surfaceArea, distance, height) {
    const depth = height - distance;
    return surfaceArea[0] * depth;
  }

  /**
   * calculate volume of a varying radius tank
   * @private
   * @static
   * @param { Array } surfaceArea - Total surface area of a tank.
   * @param { Number } height - The height to the tank.
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcTotalVolumeVariableRadius(surfaceArea, height) {
    const bigRadius = DeviceHelper.calcRadius(Math.max(...surfaceArea));
    const smallRadius = DeviceHelper.calcRadius(Math.min(...surfaceArea));
    return (
      (1 / 3)
      * Math.PI
      * height
      * (bigRadius ** 2 + bigRadius * smallRadius + smallRadius ** 2)
    );
  }

  /**
   * calculate volume left of a varying radius tank
   * @private
   * @static
   * @param { Array } surfaceArea - Total surface area of a tank.
   * @param { Number } distance - Distance from the device to level of fluid
   * @param { Number } height - Height of the tank
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcVolumeLeftVariableRadius(surfaceArea, distance, height) {
    const bigRadius = DeviceHelper.calcRadius(Math.max(...surfaceArea));
    const smallRadius = DeviceHelper.calcRadius(Math.min(...surfaceArea));
    const depth = height - distance;
    const radius = (depth * ((bigRadius - smallRadius) / height)) + smallRadius;
    return (
      (1 / 3)
      * Math.PI
      * depth
      * (radius ** 2 + radius * smallRadius + smallRadius ** 2)
    );
  }

  /**
   * calculate radius of a tank
   * @private
   * @static
   * @param { Number } surfaceArea - Total surface area of a tank.
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcRadius(surfaceArea) {
    return Math.sqrt(surfaceArea / Math.PI);
  }

  /**
   * calculate volume left of a Horizontal Cylindrical tank
   * @private
   * @static
   * @param { Array } surfaceArea - Total surface area of a tank.
   * @param { Number } distance - Distance from the device to level of fluid
   * @param { Number } height - Height of the tank
   * @memberof DeviceHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcHorizontalCylinderVolumeLeft(surfaceArea, distance, height) {
    const radius = DeviceHelper.calcRadius(surfaceArea[0]);
    const depth = 2 * radius - distance;
    const lhs = radius ** 2 * Math.acos((radius - depth) / radius);
    const rhs = (radius - depth) * Math.sqrt(2 * radius * depth - depth ** 2);
    return height * (lhs - rhs);
  }

  /**
   * Volume left calculation based on tank type
   * @memberof DeviceHelper
   * @param {string} type - distance and deviceId
   * @param {Array} surfaceArea - distance and deviceId
   * @param {Number} distance - distance and deviceId
   * @param {Number} height - distance and deviceId
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with volume of Tank.
   */
  static async calcVolumeLeftByTankType(type, surfaceArea, distance, height) {
    switch (type) {
      case 'variable_radius':
        return DeviceHelper.calcVolumeLeftVariableRadius(surfaceArea, distance, height);
      case 'horizontal_cylinder':
        return DeviceHelper.calcHorizontalCylinderVolumeLeft(surfaceArea, distance, height);
      default:
        return DeviceHelper.calcVolumeLeft(surfaceArea, distance, height);
    }
  }

  /**
   * Total volume calculation based on tank type
   * @memberof DeviceHelper
   * @param {string} type - tank type
   * @param {Array} surfaceArea - surface area
   * @param {Number} height - tank height
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with volume of Tank.
   */
  static async calcTotalVolumeByTankType(type, surfaceArea, height) {
    switch (type) {
      case 'variable_radius':
        return DeviceHelper.calcTotalVolumeVariableRadius(surfaceArea, height);
      default:
        return DeviceHelper.calcTotalVolume(surfaceArea, height);
    }
  }
}

export default DeviceHelper;
