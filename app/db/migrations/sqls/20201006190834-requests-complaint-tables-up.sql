CREATE TABLE IF NOT EXISTS expansion(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  capacity INTEGER NOT NULL,
  address VARCHAR(50) NOT NULL,
  facility_type facility_facility_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS complaint(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  category VARCHAR(50) NOT NULL,
  message VARCHAR(500) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
