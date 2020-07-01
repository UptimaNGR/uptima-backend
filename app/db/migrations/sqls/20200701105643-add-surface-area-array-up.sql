/* Replace with your SQL commands */
ALTER TABLE IF EXISTS tank ALTER COLUMN surface_area TYPE numeric(11, 5)[] USING array[surface_area]::numeric(11, 5)[];
ALTER TABLE IF EXISTS tank ALTER COLUMN total_volume TYPE numeric(11, 5) USING total_volume::numeric(11, 5);
ALTER TABLE IF EXISTS device ALTER COLUMN dist_to_device TYPE numeric(11, 3) USING dist_to_device::numeric(11, 3);
ALTER TABLE IF EXISTS tank ALTER COLUMN height TYPE numeric(11, 3) USING height::numeric(11, 3);
