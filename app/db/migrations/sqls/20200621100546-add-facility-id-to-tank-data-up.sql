/* Replace with your SQL commands */
ALTER TABLE IF EXISTS tank_data ADD COLUMN facility_id uuid REFERENCES facility(id);
ALTER TABLE IF EXISTS tank ADD COLUMN price INT;
ALTER TABLE IF EXISTS tank ADD COLUMN min_level INT;
