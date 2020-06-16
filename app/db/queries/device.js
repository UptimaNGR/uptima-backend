export default {
  createDevice: `
    INSERT INTO
      device(
          id,
          company_id,
          facility_id,
          tank_id,
          serial_number,
          dist_to_device
        )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,

  updateDeviceById: `
    UPDATE
      device
    SET
        tank_id=($1),
        serial_number=($2),
        dist_to_device=($3),
        company_id=($4),
        facility_id=($5),
        updated_at=NOW()
    WHERE
        id=($6)
    RETURNING *
  `,

  fetchDeviceBySerialNumber: `
    SELECT * FROM device
    WHERE serial_number=$1;
  `,

  fetchDeviceByTankId: `
    SELECT * FROM device
    WHERE tank_id=$1;
  `,

  fetchDeviceById: `
    SELECT * FROM device
    WHERE id=$1;
  `
};
