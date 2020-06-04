/* Replace with your SQL commands */

ALTER TABLE IF EXISTS user_info ADD COLUMN facility_id uuid REFERENCES facility(id) NOT NULL;
ALTER TABLE IF EXISTS user_info RENAME COLUMN user_type TO role;
ALTER TABLE IF EXISTS facility ADD COLUMN address VARCHAR(150);
ALTER TABLE IF EXISTS contact_us ALTER COLUMN facility_type TYPE facility_facility_type USING facility_type::facility_facility_type;
