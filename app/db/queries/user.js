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
          user_type,
          email,
          phone_number,
          company_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        user_type=($6),
        email=($7),
        phone_number=($8)
      WHERE
        username=($9)
      RETURNING
        id,
        first_name,
        last_name,
        middle_name,
        username,
        password,
        salt,
        user_type,
        email,
        phone_number,
    `,

  checkIfUserExists: `
    SELECT *
    FROM user_info
    WHERE username=($1)`,

  checkIfEmailExists: `
    SELECT *
    FROM user_info
    WHERE email=($1)`,
};
