/* Replace with your SQL commands */

DROP TABLE IF EXISTS tank_data CASCADE;

DROP TABLE IF EXISTS device CASCADE;

CREATE TABLE IF NOT EXISTS device(
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  facility_id uuid REFERENCES facility(id)  NOT NULL,
  tank_id uuid REFERENCES tank(id)  NOT NULL,
  serial_number VARCHAR(100) UNIQUE NOT NULL,
  dist_to_device INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tank_data(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  device_serial_number VARCHAR(100) REFERENCES device(serial_number) NOT NULL,
  tank_id uuid REFERENCES tank(id) NOT NULL,
  volume INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

