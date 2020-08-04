export default {
  createMsg: `
    INSERT INTO contact_us(
      name,
      email,
      phone_number,
      company_name,
      facility_type,
      number_of_tanks,
      message
    )VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,

  getContactUsMsgs: `
    SELECT * FROM contact_us
    OFFSET $1
    LIMIT $2;
  `,

  getContactUsMsgsCount: `
    SELECT COUNT(*) as total FROM contact_us;
  `,

  createContactUs: `
    INSERT INTO contact_us_homepage(
      name,
      email,
      phone_number,
      company_name,
      message
    )VALUES ($1, $2, $3, $4, $5)
    RETURNING *`
};
