/* Replace with your SQL commands */

INSERT INTO
      admin_info(
          id,
          first_name,
          last_name,
          middle_name,
          username,
          password,
          salt,
          email,
          phone_number
        )
VALUES
	(
		'34a040bc-c4fe-4ebc-aa62-62bd9fb63e72',
		'Kd',
        'Temp',
        'Gee',
        'addempsea',
        '76d5c413e9315ee773e4fb9e1000cd5bea69001fdeec1fc3fd3778f487c0886c',
        '$2b$10$GskzbMfpyBBvXRDyYpblhu',
        'admin01@uptima.ng',
        '08168205169'
	) 
ON CONFLICT (email)
DO
UPDATE
SET
salt = EXCLUDED.salt,
password = EXCLUDED.password;
