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
      (jsonb_build_object('date', hp.hour_checked)
      || jsonb_object_agg(us.title, hp.average_latency)) AS result
    FROM hourly_pings hp
    JOIN user_sites us ON hp.user_site_id = us.id
    WHERE us.user_id = ($1)
    GROUP BY hp.hour_checked
    ORDER BY hp.hour_checked;
    `, [userID]);
    const data = result.rows.map(row => row.result);
    return data
}

export async function getDailyData(userID: number) {
  const result = await pool.query(`
    SELECT
      (jsonb_build_object('date', DATE(hp.hour_checked))
      || jsonb_object_agg(us.title, hp.average_latency)) AS result
    FROM hourly_pings hp
    JOIN user_sites us ON hp.user_site_id = us.id
    WHERE us.user_id = ($1)
    GROUP BY DATE(hp.hour_checked)
    ORDER BY DATE(hp.hour_checked);
    `, [userID]);
    const data = result.rows.map(row => row.result);
    return data
}