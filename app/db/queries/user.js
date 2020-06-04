export default {
  createUser: `
      INSERT INTO
      user_info(
          id,
          first_name,
          last_name,
          middle_name,
          username,
          password,
          salt,
          role,
          email,
          phone_number,
          company_id,
          is_admin
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,

  updateUser: `
      UPDATE
      user_info
      SET
        first_name=($1),
        last_name=($2),
        middle_name=($3),
        password=($4),
        salt=($5),
        role=($6),
        email=($7),
        phone_number=($8),
        company_id=($9)
      WHERE
        username=($10)
      RETURNING
        id,
        first_name,
        last_name,
        middle_name,
        username,
        password,
        salt,
        role,
        email,
        phone_number,
    `,

  fetchUserByUsername: `
    SELECT *
    FROM user_info
    WHERE username=($1)`,

  fetchUserByEmail: `
    SELECT *
    FROM user_info
    WHERE email=($1)`,

  fetchUserByPhone: `
    SELECT *
    FROM user_info
    WHERE username=($1)`,

  fetchUserById: `
    SELECT * FROM user_info
    WHERE id=($1);`
};
