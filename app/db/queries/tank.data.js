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
  `,

  getSingleTankDataCurrentDay: `
  SELECT 
    volume, EXTRACT(HOUR FROM created_at), created_at AS hour
  FROM 
    tank_data
  WHERE 
    tank_id = $1 
  AND 
  DATE_TRUNC('DAY', created_at) = DATE_TRUNC('day', current_date)
  ORDER BY hour;
  `,

  getSingleTankDataDaily: `
  SELECT 
    volume, EXTRACT(HOUR FROM created_at) AS hour, created_at 
  FROM 
    tank_data
  WHERE 
    tank_id = $1 
  AND 
  DATE_TRUNC('DAY', created_at) = $2
  ORDER BY hour;`
};
