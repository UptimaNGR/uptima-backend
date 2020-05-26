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
};
