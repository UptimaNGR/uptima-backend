/* Replace with your SQL commands */
ALTER TABLE IF EXISTS tank ALTER COLUMN serial_number TYPE varchar USING serial_number::varchar;
ALTER TABLE IF EXISTS device ADD COLUMN status company_subscription_status DEFAULT 'active';
ALTER TABLE IF EXISTS tank_data ADD COLUMN price INTEGER;

CREATE TABLE IF NOT EXISTS price(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  fluid_type VARCHAR(350) NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


