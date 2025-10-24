import { Pool } from "pg";

const isDocker = process.env.DATABASE_URL?.includes("@db:") || process.env.DOCKER_ENV === "true";

// Pick the correct config dynamically
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: "postgres",
        host: isDocker ? "db" : "localhost",
        database: "pingbay",
        password: "postgres",
        port: 5432,
      }
);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
});

async function connectWithRetry(retries = 20, delayMs = 2000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ Connected to Postgres!");
      return;
    } catch (err) {
      console.warn(
        `❌ Database connection failed (attempt ${i}/${retries}). Retrying in ${delayMs / 1000}s...`
      );
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  console.error("🚨 Could not connect to database after multiple attempts. Exiting...");
  process.exit(1);
}

connectWithRetry();

export { pool };