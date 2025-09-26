import { pool } from "./dbconfig.js";

export async function insertUserTest() {
  const result = await pool.query(
    "INSERT INTO user"
  )
}

export async function getUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}