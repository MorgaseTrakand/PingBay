import { pool } from "../dbconfig.js";

export async function getSitesBasedOnInterval(interval: number) {
  const values = [interval];

  if (interval === 3600) {
    values.push(300, 60);
  } else if (interval === 300) {
    values.push(60);
  }

  //creates dynamic or statements for multiple values
  const placeholders = values.map((_, i) => `$${i + 1}`).join(" OR check_interval = ");

  const result = await pool.query(
    `SELECT * FROM user_sites WHERE check_interval = ${placeholders}`,
    values
  );

  return result;
}

export function insertPing(user_site_id: number, isUp: boolean, ms: number) {
  const now = new Date();
  const status = isUp ? 'up' : 'down';

  pool.query(
    `INSERT INTO pings (user_site_id, checked_at, status, latency_ms) VALUES ($1, $2, $3, $4)`, [user_site_id, now, status, ms]
  )
}