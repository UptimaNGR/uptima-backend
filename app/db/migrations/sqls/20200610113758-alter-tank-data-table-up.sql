/* Replace with your SQL commands */

ALTER TABLE IF EXISTS tank_data ADD COLUMN volume_used DECIMAL(10,5);
ALTER TABLE IF EXISTS tank_data RENAME COLUMN volume TO volume_left;
ALTER TABLE IF EXISTS tank_data ALTER COLUMN volume_left TYPE decimal(10,5);
ALTER TABLE IF EXISTS tank_data ADD COLUMN latitude DECIMAL(10,5);
ALTER TABLE IF EXISTS tank_data ADD COLUMN longitude DECIMAL(10,5);
ALTER TABLE IF EXISTS tank_data ADD COLUMN volume_added DECIMAL(10,5);
