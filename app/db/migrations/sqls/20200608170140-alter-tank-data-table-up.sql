/* Replace with your SQL commands */

DROP TABLE IF EXISTS tank_data CASCADE;

CREATE TABLE IF NOT EXISTS tank_data(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  device_serial_number VARCHAR(100) REFERENCES device(serial_number) NOT NULL,
  tank_id uuid REFERENCES tank(id) NOT NULL,
  volume INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

