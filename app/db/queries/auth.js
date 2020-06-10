export default {
  fetchAdminById: `
    SELECT * FROM admin_info
    WHERE email=($1);`
};
