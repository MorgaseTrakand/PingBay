import { pool } from "../dbconfig.js";

export async function getNumberOfSites(userID: number) {
  let result = await pool.query(
    "SELECT COUNT(*) AS n FROM user_sites WHERE user_id = $1",
    [userID]
  )
  return result.rows[0]
}