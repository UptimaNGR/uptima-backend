export default {
  createLoginLog: `
    INSERT INTO login_logs(
      company_id,
      user_id
    ) VALUES($1, $2);
  `,
  getLoginLogPaginated: `
    SELECT ui.first_name || ' ' || ui.last_name as name, f.address, ll.created_at FROM login_logs ll
    INNER JOIN user_info ui
    ON ui.id = ll.user_id
    INNER JOIN facility f
    ON f.id = ui.facility_id
    WHERE ll.company_id = $3
    ORDER BY ll.created_at DESC
    OFFSET $1
    LIMIT $2
  `,
  countPages: `
    SELECT count(*) as total FROM login_logs
    WHERE company_id = $1;
  `
};
