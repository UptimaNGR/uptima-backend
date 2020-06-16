export default {
  createFacility: `
    INSERT INTO
      facility(
        id,
        company_id,
        gps_coordinate,
        facility_name,
        facility_type,
        address
      )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,

  updateFacilityById: `
    UPDATE
      facility
    SET
      company_id=($1),
      gps_coordinate=($2),
      facility_name=($3),
      facility_type=($4),
      address=($5),
      updated_at=NOW()
    WHERE
      id=($6)
    RETURNING
      id,
      company_id,
      gps_coordinate,
      facility_name,
      facility_type;
  `,

  fetchFacilityByCompanyId: 'SELECT * FROM facility WHERE company_id=$1',
  fetchFacilityByFacilityName: 'SELECT * FROM facility WHERE facility_name=$1',
  fetchFacilityById: 'SELECT * FROM facility WHERE id=$1',
  fetchFacilityByGps: 'SELECT * FROM facility WHERE gps_coordinate=$1',
  fetchAllFacilities: 'SELECT * FROM facility;'
};
