export default {
  createExpansion: `
      INSERT INTO expansion(
        company_id,
        capacity,
        address,
        facility_type
      ) VALUES($1, $2, $3, $4);
    `,
  getLoginLogPaginated: `
      SELECT * FROM expansion
      ORDER BY created_at DESC
    `,
  countPages: `
      SELECT count(*) as total FROM expansion
      WHERE company_id = $1;
    `
};
