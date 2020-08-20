/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS login_logs(
  id SERIAL PRIMARY KEY,
  company_id uuid REFERENCES company(id) NOT NULL,
  user_id uuid REFERENCES user_info(id) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
