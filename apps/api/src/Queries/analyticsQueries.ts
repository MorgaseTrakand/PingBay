import { pool } from "../dbconfig.js";

export async function getNumberOfSites(userID: number) {
  let result = await pool.query(
    "SELECT COUNT(*) AS n FROM user_sites WHERE user_id = $1",
    [userID]
  )
  return result.rows[0]
}

export async function getHourlyData(userID: number) {
  const result = await pool.query(`
    SELECT
      us.title AS site_title,
      json_agg(hp ORDER BY hp.hour_checked)
    FROM user_sites us
    JOIN hourly_pings hp
      ON hp.user_site_id = us.id
    WHERE us.user_id = ($1)
    GROUP BY us.id, us.title
    ORDER BY us.id;
  `, [userID]);
  
  console.log(result.rows)
  return result.rows;
}