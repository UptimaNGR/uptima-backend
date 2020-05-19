export default {
  createMsg: `
    INSERT INTO contact_us(
      name,
      email,
      phone_number,
      company_name,
      facility_type,
      numberoftanks,
      message
    )VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,

  getContactUsMsgs: `
    SELECT * FROM contact_us;
  `,

  getContactUsMsgsCount: `
    SELECT COUNT(*) as total FROM contact_us;
  `
};
