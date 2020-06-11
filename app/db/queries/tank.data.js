export default {
  createTankData: `
    INSERT INTO
      tank_data(
        company_id,
        device_serial_number,
        tank_id,
        volume_left,
        volume_used,
        longitude,
        latitude,
        volume_added
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
    volume_left, volume_used, EXTRACT(HOUR FROM created_at) AS hour, created_at 
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
  volume_left, volume_used, EXTRACT(HOUR FROM created_at) AS hour, created_at 
  FROM 
    tank_data
  WHERE 
    tank_id = $1 
  AND 
  DATE_TRUNC('DAY', created_at) = $2
  ORDER BY hour;`,

  getLastVolumeLeft: `
  SELECT volume_left FROM tank_data 
  WHERE device_serial_number =$1 
  ORDER BY created_at DESC
  LIMIT 1;`
};
