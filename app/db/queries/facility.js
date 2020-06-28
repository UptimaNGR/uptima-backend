export default {
  createFacility: `
    INSERT INTO
      facility(
        id,
        company_id,
        gps_coordinate,
        facility_name,
        facility_type,
        address,
        opening_time,
        closing_time
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
  fetchAllFacilities: 'SELECT * FROM facility;',

  updateFacilityCloseAndOpenTimeById: `
    UPDATE
      facility
    SET
      opening_time=($1),
      closing_time=($2),
      updated_at=NOW()
    WHERE
      id=($3)
    RETURNING *
  `,

  fetchFacilityCloseAndOpenTimeById: `
  SELECT id, opening_time, closing_time FROM facility WHERE id=$1
  `
};
