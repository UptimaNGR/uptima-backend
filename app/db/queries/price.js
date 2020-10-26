export default {
  createPrice: `
      INSERT INTO
        price(
            company_id,
            fluid_type,
            amount
          )
      VALUES ($1, $2, $3)
      RETURNING *`,

  updatePriceById: `
      UPDATE
        price
      SET
          amount=($1)
          updated_at=NOW()
      WHERE
          id=($3)
      AND
          company_id=($2)
      RETURNING *
    `,

  fetchPrice: `
      SELECT * FROM price
      WHERE company_id=($1);
    `,
  fetchPriceByCompanyAndType: 'SELECT * FROM price WHERE company_id=$1 AND fluid_type=$2'
};
