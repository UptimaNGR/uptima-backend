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
    RETURNING *`,

  fetchTankById: 'SELECT * FROM tank WHERE id=$1',
  fetchTankByFacilityId: 'SELECT * FROM tank WHERE facility_id=$1',
  fetchTankBySerialNumberAndFacilityId: `
    SELECT * FROM tank
    WHERE facility_id=$1 AND serial_number=$2;`
};
