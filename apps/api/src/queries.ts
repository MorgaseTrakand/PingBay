import { pool } from "./dbconfig.js";
import bcrypt from "bcrypt";

export async function findUser(email: string) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )
  return result
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  let result = await pool.query(
    `INSERT INTO users (email, password_hash, created_at) 
     VALUES ($1, $2, $3)`,
    [email, hashedPassword, new Date()]
  );
  return result
}

export async function getUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}