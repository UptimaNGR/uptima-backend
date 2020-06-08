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
          is_admin,
          facility_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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

  getUsersPaginated: `SELECT 
    user_info.id,
    first_name,
    last_name,
    email, 
    role,
    facility.name,
    user_info.phone,
    user_info.created_at,
    user_info.updated_at
    FROM 
    user_info
    INNER JOIN facility ON facility.id = user_info.facility_id
    WHERE facility.id = $3
    ORDER BY user_info.created_at DESC
    OFFSET $1
    LIMIT $2
  ;`,

  countPages: 'SELECT COUNT(*) as total FROM user_info WHERE facility.id = $1;',

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
    WHERE phone_number=($1)`,

  fetchUserById: `
    SELECT * FROM user_info
    WHERE id=($1);`,

  updateUserPassword: `
    UPDATE user_info
    SET
    password=$2,
    salt=$3
    WHERE id=$1
    RETURNING id, first_name, last_name, email, role, facility_id, phone
    ;`,
  updateUserFacility: `
    UPDATE user_info
    SET
    location_id=$2
    WHERE id=$1
  ;`,
  deleteUser: `
    DELETE FROM
    user_info
    WHERE id=$1
  ;`,
  updateRoleById: `
    UPDATE user_info
    SET
    role=$2
    WHERE id=$1
  ;`
};
