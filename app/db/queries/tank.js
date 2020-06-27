export default {
  createTank: `
    INSERT INTO
      tank(
        id,
        company_id,
        facility_id,
        serial_number,
        fluid_type,
        structure_type,
        height,
        surface_area,
        total_volume
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `,

  updateTankById: `
    UPDATE
      tank
    SET
      company_id=($1),
      facility_id=($2),
      serial_number=($3),
      fluid_type=($4),
      structure_type=($5),
      height=($6),
      surface_area=($7),
      total_volume=($8),
      updated_at=NOW()
    WHERE
      id=($9)
    RETURNING *
  `,

  fetchTankById: 'SELECT * FROM tank WHERE id=$1',
  fetchTankByFacilityId: 'SELECT * FROM tank WHERE facility_id=$1',
  fetchTankBySerialNumberAndFacilityId: `
    SELECT * FROM tank
    WHERE facility_id=$1 AND serial_number=$2;`,
  fetchTankBySerialNumber: 'SELECT * FROM tank WHERE serial_number=$1',

  updateTankPriceById: `
    UPDATE
      tank
    SET
      price=($1),
      min_level=($2),
      updated_at=NOW()
    WHERE
      id=($3)
    RETURNING *
  `
};
