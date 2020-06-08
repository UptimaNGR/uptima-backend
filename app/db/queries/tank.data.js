export default {
  createTankData: `
    INSERT INTO
      tank_data(
        company_id,
        device_serial_number,
        tank_id,
        volume
      )
    VALUES ($1, $2, $3, $4)
    RETURNING *`,

  fetchTankSurfaceAreaByDeviceId: `
  SELECT 
    *
  FROM 
    tank
  INNER JOIN 
    device
  ON  
    tank.id = device.tank_id
  WHERE 
    device.serial_number=$1;
  `
};
