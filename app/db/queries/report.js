export default {
  getTankDailySalesReport: `
  SELECT  
    DISTINCT t.fluid_type, SUM(volume_used) as total, date_trunc('day', td.created_at) as day 
  FROM 
    tank_data td
  INNER JOIN 
    tank t
  ON 
    td.tank_id = t.id
  WHERE 
    td.facility_id = $1
  GROUP BY 
    t.fluid_type , date_trunc('day', td.created_at)
  ORDER BY 
    date_trunc('day', td.created_at)`,

  getTankMonthlySalesReport: `
  SELECT  
    DISTINCT t.fluid_type, SUM(volume_used) as total, date_trunc('month', td.created_at) as month 
  FROM 
    tank_data td
  INNER JOIN 
    tank t
  ON 
    td.tank_id = t.id
  WHERE 
    td.facility_id = $1
  GROUP BY 
    t.fluid_type , date_trunc('month', td.created_at)
  ORDER BY 
    date_trunc('month', td.created_at)`,

  getTankWeeklySalesReport: `
  SELECT  
    DISTINCT t.fluid_type, SUM(volume_used) as total, date_trunc('week', td.created_at) as week 
  FROM 
    tank_data td
  INNER JOIN 
    tank t
  ON 
    td.tank_id = t.id
  WHERE 
    td.facility_id = $1
  GROUP BY 
    t.fluid_type , date_trunc('week', td.created_at)
  ORDER BY 
    date_trunc('week', td.created_at)`,
};
