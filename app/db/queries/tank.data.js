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
        volume_added,
        facility_id,
        price
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,

  fetchTankSurfaceAreaByDeviceId: `
  SELECT 
    t.surface_area,
    t.company_id,
    tank_id,
    t.total_volume,
    t.facility_id,
    d.dist_to_device,
    t.height,
    t.structure_type,
    t.fluid_type
  FROM 
    tank t
  INNER JOIN 
    device d
  ON  
    t.id = d.tank_id
  WHERE 
    d.serial_number=$1;
  `,

  getSingleTankDataCurrentDay: `
  SELECT 
    volume_left, volume_used, volume_added, EXTRACT(HOUR FROM created_at) AS hour, latitude, longitude, created_at 
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
  volume_left, volume_used, volume_added, EXTRACT(HOUR FROM created_at) AS hour, latitude, longitude, created_at 
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
  LIMIT 1;`,

  getLastVolumeLeftByTankId: `
  SELECT volume_left, latitude, longitude FROM tank_data 
  WHERE tank_id =$1 
  ORDER BY created_at DESC
  LIMIT 1;`,

  getLastTimeFilled: `
  SELECT created_at FROM tank_data 
  WHERE tank_id = $1 AND 
  volume_added > 0
  ORDER BY created_at DESC
  LIMIT 1;`
};
