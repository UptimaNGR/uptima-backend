/* Replace with your SQL commands */

DROP TABLE IF EXISTS contact_us;

CREATE TABLE IF NOT EXISTS contact_us(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  email VARCHAR(150)  NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  number_of_tanks INTEGER NOT NULL,
  facility_type TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
