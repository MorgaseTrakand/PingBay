import { pool } from "../dbconfig.js";

export async function populateSampleData(userID: number) {
  const result = await pool.query(`
    WITH new_sites AS (
      INSERT INTO user_sites (user_id, url, title, check_interval, notifications_enabled)
      VALUES
        ($1, 'https://www.nytimes.com', 'The New York Times', 60, false),
        ($1, 'https://www.bbc.com', 'BBC News', 60, false)
      RETURNING id AS user_site_id, url
    ),
    hourly_data AS (
      SELECT
        s.user_site_id,
        s.url,
        generate_series(
          date_trunc('hour', now() - interval '30 days'),
          date_trunc('hour', now()),
          '1 hour'
        ) AS hour_checked,
        CASE
          WHEN random() < 0.85 THEN 'up'
          WHEN random() < 0.98 THEN 'down'
          ELSE 'error'
        END AS status,
        floor(random() * 900 + 100)::int AS average_latency,
        floor(random() * 15 + 85)::int AS total_successes,
        floor(random() * 49 + 2)::int AS total_failures
      FROM new_sites s
    ),
    inserted_pings AS (
      INSERT INTO hourly_pings (
        user_site_id,
        hour_checked,
        status,
        average_latency,
        total_successes,
        total_failures
      )
      SELECT
        user_site_id,
        hour_checked,
        status,
        average_latency,
        total_successes,
        total_failures
      FROM hourly_data
      RETURNING user_site_id
    )
    SELECT DISTINCT ns.user_site_id, ns.url
    FROM new_sites ns;
  `, [userID]);

  return result.rows.map(r => ({
    id: r.user_site_id,
    url: r.url,
  }));
}