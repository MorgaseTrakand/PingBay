import { pool } from "../dbconfig.js";

export async function addSite(userID: number, url: string, title: string, interval: number, notifications: string) {
  const result = await pool.query(
    `INSERT INTO user_sites (user_id, url, title, check_interval, notifications_enabled)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING user_id`,
    [userID, url, title, interval, notifications]
  )
  return result
}

export async function getSites(userID: number) {
  const result = await pool.query(
    "SELECT * FROM user_sites WHERE user_id = ($1)",
    [userID]
  )
  return result
}