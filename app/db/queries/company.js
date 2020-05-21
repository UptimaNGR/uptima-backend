export default {
  createCompany: `
    INSERT INTO
      company(
          id,
          company_name,
          address,
          email,
          phone_number,
          subscription_type,
          subscription_status,
          logo
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,

  updateCompanyDetails: `
    UPDATE
      company
    SET
        company_name=($1),
        address=($2),
        email=($3),
        subscription_type=($4),
        subscription_status=($5),
        logo=($6)
    WHERE
        id=($7)
    RETURNING
        id,
        company_name,
        address,
        email,
        phone_number,
        subscription_type,
        subscription_status,
        logo;
    `,

  fetchCompanyByEmail: 'SELECT * FROM company WHERE email=$1',
  fetchCompanyByPhone: 'SELECT * FROM company WHERE phone_number=$1'
};
