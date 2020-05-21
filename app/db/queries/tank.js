export default {
  createTank: `
        INSERT INTO
            tank(
                company_id,
                facility_id,
                serial_number,
                fluid_type,
                structure_type,
                height,
                surface_area,
                total_volume
            )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`
};
