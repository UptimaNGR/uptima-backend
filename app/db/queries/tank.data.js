export default {
  createTankData: `
      INSERT INTO
        tank_data(
            company_id,
            device_id,
            tank_id,
            volume
        )
    VALUES ($1, $2, $3, $4)
    RETURNING *`
};
