/* Replace with your SQL commands */

ALTER TABLE IF EXISTS user_info ADD COLUMN facility_id uuid REFERENCES facility(id) NOT NULL;
ALTER TABLE IF EXISTS user_info RENAME COLUMN user_type TO role;
ALTER TABLE IF EXISTS facility ADD COLUMN address VARCHAR(150);
DROP TABLE IF EXISTS contact_us;

CREATE TABLE IF NOT EXISTS contact_us(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  email VARCHAR(150)  NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  number_of_tanks INTEGER NOT NULL,
  facility_type facility_facility_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
