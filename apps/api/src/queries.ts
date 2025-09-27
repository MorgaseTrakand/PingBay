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
  await pool.query(
    `INSERT INTO users (email, password, created_at) 
     VALUES ($1, $2, $3)`,
    [email, hashedPassword, new Date()]
  );
}

export async function getUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}