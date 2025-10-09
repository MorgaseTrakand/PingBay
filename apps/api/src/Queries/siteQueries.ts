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

export async function deleteSite(siteID: number) {
  await pool.query(
    `DELETE FROM user_sites WHERE id = ($1)`,
    [siteID]
  )
  return 5
}

export async function editSite(siteID: number, newTitle: string, newURL: string) {
  await pool.query(
    `UPDATE user_sites SET url = ($2), title = ($3) WHERE id = ($1)`,
    [siteID, newURL, newTitle]
  )
  return
}

export async function deleteMultipleSites(siteIDs: number[]) {
  if (siteIDs.length === 0) return;

  const placeholders = siteIDs.map((_, i) => `$${i + 1}`).join(", ");

  await pool.query(
    `DELETE FROM user_sites WHERE id IN (${placeholders})`,
    siteIDs
  );
}

export async function changeNotifications(siteID: number) {
  await pool.query(
    'UPDATE user_sites SET notifications_enabled = NOT notifications_enabled WHERE id = $1',
    [siteID]
  );
}

export async function getStates(siteIDs: number[]) {
  const placeholders = siteIDs.map((_, i) => `$${i + 1}`).join(", ");
  
  const result = await pool.query(
    `SELECT * FROM monitor_state WHERE monitor_id IN (${placeholders})`,
    siteIDs
  );
  return result
}