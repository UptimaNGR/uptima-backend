export default {
  createDevice: `
    INSERT INTO
      device(
          id,
          company_id,
          facility_id,
          tank_id,
          serial_number
        )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,

  updateDeviceById: `
    UPDATE
      device
    SET
        tank_id=($1),
        serial_number=($2),
        company_id=($3),
        facility_id=($4),
        updated_at=NOW()
    WHERE
        id=($5)
    RETURNING *
  `,

  fetchDeviceBySerialNumber: `
    SELECT * FROM device
    WHERE serial_number=$1 and status='active';
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
