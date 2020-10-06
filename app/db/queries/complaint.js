export default {
  createComplaint: `
        INSERT INTO complaint(
          company_id,
          category,
          message
        ) VALUES($1, $2, $3);
      `,
  getLoginLogPaginated: `
        SELECT * FROM complaint
        ORDER BY created_at DESC
      `,
  countPages: `
        SELECT count(*) as total FROM complaint
        WHERE company_id = $1;
      `
};
