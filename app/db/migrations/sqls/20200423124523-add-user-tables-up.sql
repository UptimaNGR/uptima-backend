/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS company(
  id uuid PRIMARY KEY,
  company_name VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  subscription_type VARCHAR(100) NOT NULL,
  subscription_status VARCHAR(100) NOT NULL,
  logo VARCHAR(150) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS facility(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  gps_coordinate VARCHAR(350) NOT NULL,
  facility_name VARCHAR(150) NOT NULL,
  facility_type VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tank(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  facility_id INTEGER REFERENCES facility(id)  NOT NULL,
  serial_number INTEGER UNIQUE NOT NULL,
  fluid_type VARCHAR(150) NOT NULL,
  structure_type VARCHAR(150) NOT NULL,
  height INTEGER NOT NULL,
  surface_area INTEGER NOT NULL,
  total_volume INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_info(
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  phone_number VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  salt VARCHAR(150) NOT NULL,
  user_type VARCHAR(150)  NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_info(
  id uuid PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  phone_number VARCHAR(30) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT true,
  password VARCHAR(100),
  salt VARCHAR(150),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS device(
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  facility_id INTEGER REFERENCES facility(id)  NOT NULL,
  tank_id INTEGER REFERENCES tank(id)  NOT NULL,
  serial_number INTEGER UNIQUE NOT NULL,
  dist_to_device INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  city VARCHAR(150) NOT NULL,
  country VARCHAR(150) NOT NULL,
  ip VARCHAR(150) NOT NULL,
  coordinates VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tank_data(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  device_id uuid REFERENCES device(id) NOT NULL,
  tank_id INTEGER REFERENCES tank(id) NOT NULL,
  volume INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tanker_data(
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  tank_id INTEGER REFERENCES tank(id) NOT NULL,
  volume INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_us(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  email VARCHAR(150)  NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  number_of_tanks INTEGER NOT NULL,
  facility_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
