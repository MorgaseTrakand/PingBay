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

export function insertPing(user_site_id: number, isUp: boolean, ms: number | null) {
  const now = new Date();
  const status = isUp ? 'up' : 'down';
  console.log(user_site_id, isUp, ms)
  pool.query(
    `INSERT INTO pings (user_site_id, checked_at, status, latency_ms) VALUES ($1, $2, $3, $4)`, [user_site_id, now, status, ms]
  )
}

export async function monitorStateUpdate(
  user_site_id: number,
  last_check: Date,
  status: boolean,
  last_status_code: number,
  last_latency_ms: number | null
) {
  await pool.query(
    `
    INSERT INTO monitor_state (
      monitor_id,
      last_check,
      status,
      last_status_code,
      last_latency_ms
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (monitor_id)
    DO UPDATE SET
      last_check = EXCLUDED.last_check,
      status = EXCLUDED.status,
      last_status_code = EXCLUDED.last_status_code,
      last_latency_ms = EXCLUDED.last_latency_ms
    `,
    [
      user_site_id,
      last_check,
      status,
      last_status_code,
      last_latency_ms,
    ]
  );
}

export async function downSample() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const query = `
      WITH hourly AS (
        SELECT
          user_site_id,
          date_trunc('hour', checked_at) AS hour_checked,
          COUNT(*) FILTER (WHERE status = 'up') AS total_successes,
          COUNT(*) FILTER (WHERE status = 'down') AS total_failures,
          COUNT(*) FILTER (WHERE status = 'error') AS total_errors,
          AVG(latency_ms)::INT AS average_latency,
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY latency_ms)::INT AS median_latency,
          PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms)::INT AS p95_latency,
          MIN(latency_ms) AS min_latency,
          MAX(latency_ms) AS max_latency,
          SUM(latency_ms * latency_ms) AS latency_sumsq
        FROM pings
        GROUP BY user_site_id, date_trunc('hour', checked_at)
      )
      INSERT INTO hourly_pings (
        user_site_id,
        hour_checked,
        status,
        average_latency,
        median_latency,
        min_latency,
        max_latency,
        total_successes,
        total_failures,
        p95_latency,
        latency_sumsq
      )
      SELECT
        user_site_id,
        hour_checked,
        CASE
          WHEN total_failures > 0 THEN 'down'
          WHEN total_failures = 0 AND total_successes = 0 AND total_errors > 0 THEN 'error'
          ELSE 'up'
        END AS status,
        average_latency,
        median_latency,
        min_latency,
        max_latency,
        total_successes,
        total_failures,
        p95_latency,
        latency_sumsq
      FROM hourly
      ON CONFLICT (user_site_id, hour_checked) DO UPDATE
        SET average_latency = EXCLUDED.average_latency,
            median_latency = EXCLUDED.median_latency,
            min_latency = EXCLUDED.min_latency,
            max_latency = EXCLUDED.max_latency,
            total_successes = EXCLUDED.total_successes,
            total_failures = EXCLUDED.total_failures,
            p95_latency = EXCLUDED.p95_latency,
            latency_sumsq = EXCLUDED.latency_sumsq,
            status = EXCLUDED.status
    `;

    const result = await client.query(query);

    // Optional: cleanup raw pings
    await client.query(`DELETE FROM pings`);
    await client.query('COMMIT');

    console.log('Hourly aggregation and cleanup complete', result.rowCount);
    return result.rowCount;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error in downSample transaction', err);
    throw err;
  } finally {
    client.release();
  }
}