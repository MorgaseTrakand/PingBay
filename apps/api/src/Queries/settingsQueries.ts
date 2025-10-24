import { pool } from "../dbconfig.js";

export async function populateSampleData(userID: number) {
  const result = await pool.query(`
    WITH sample_sites AS (
      SELECT * FROM (VALUES
        ('https://www.nytimes.com', 'The New York Times'),
        ('https://www.bbc.com', 'BBC News'),
        ('https://www.reddit.com', 'Reddit'),
        ('https://www.github.com', 'GitHub'),
        ('https://www.cnn.com', 'CNN'),
        ('https://www.wikipedia.org', 'Wikipedia'),
        ('https://www.medium.com', 'Medium'),
        ('https://www.nationalgeographic.com', 'National Geographic')
      ) AS t(url, title)
    ),

    inserted_sites AS (
      INSERT INTO user_sites (user_id, url, title, check_interval, notifications_enabled)
      SELECT
        ($1) AS user_id,
        url,
        title,
        60 AS check_interval,
        false AS notifications_enabled
      FROM sample_sites
      ORDER BY RANDOM()
      LIMIT 2
      RETURNING id AS user_site_id, url, title
    ),

    hours AS (
      SELECT generate_series(
        date_trunc('hour', now() - interval '30 days'),
        date_trunc('hour', now()),
        '1 hour'
      ) AS hour_ts
    ),

    rows_to_insert AS (
      SELECT
        ins.user_site_id,
        h.hour_ts AS hour_checked,

        CASE
          WHEN rnd.r_status < 0.95 THEN 'up'
          WHEN rnd.r_status < 0.99 THEN 'down'
          ELSE 'error'
        END AS status,

        CASE
          WHEN rnd.r_status < 0.95 THEN (floor(50 + rnd.r_latency * 450))::int
          ELSE NULL
        END AS average_latency,

        CASE
          WHEN rnd.r_status < 0.95 THEN GREATEST(1, (floor((floor(50 + rnd.r_latency * 450)) - (rnd.r_median * 10)))::int)
          ELSE NULL
        END AS median_latency,

        CASE
          WHEN rnd.r_status < 0.95 THEN GREATEST(1, (floor((floor(50 + rnd.r_latency * 450)) - (rnd.r_min * ((floor(50 + rnd.r_latency * 450)) * 0.5))))::int)
          ELSE NULL
        END AS min_latency,

        CASE
          WHEN rnd.r_status < 0.95 THEN (floor((floor(50 + rnd.r_latency * 450)) + (rnd.r_max * ((floor(50 + rnd.r_latency * 450)) * 2))))::int
          ELSE NULL
        END AS max_latency,

        CASE
          WHEN rnd.r_status < 0.95 THEN (floor(90 + rnd.r_success * 11))::int        -- 90..100 successes when up
          WHEN rnd.r_status < 0.99 THEN (floor(rnd.r_success * 11))::int             -- 0..10 successes when down
          ELSE 0                                                                     -- 0 successes on error
        END AS total_successes,

        CASE
          WHEN rnd.r_status < 0.95 THEN (100 - (floor(90 + rnd.r_success * 11))::int) -- failures complementary when up
          WHEN rnd.r_status < 0.99 THEN (100 - (floor(rnd.r_success * 11))::int)     -- failures complementary when down
          ELSE 100                                                                    -- all failures on error
        END AS total_failures,

        CASE
          WHEN rnd.r_status < 0.95 THEN ( (floor(50 + rnd.r_latency * 450)) + (floor(rnd.r_p95 * 200)) )::int
          ELSE NULL
        END AS p95_latency,

        CASE
          WHEN rnd.r_status < 0.95 THEN
            ( ( (floor(50 + rnd.r_latency * 450))::bigint * (floor(50 + rnd.r_latency * 450))::bigint ) * ( (CASE WHEN rnd.r_status < 0.95 THEN (floor(90 + rnd.r_success * 11))::int ELSE 0 END)::bigint ) )
          ELSE NULL
        END AS latency_sumsq

      FROM inserted_sites ins
      CROSS JOIN hours h
      CROSS JOIN LATERAL (
        SELECT
          random()       AS r_status,   -- for status selection
          random()       AS r_latency,  -- to shape average latency
          random()       AS r_min,
          random()       AS r_max,
          random()       AS r_median,
          random()       AS r_p95,
          random()       AS r_success
      ) AS rnd
    )

    -- Final insert into hourly_pings
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
      status,
      average_latency,
      median_latency,
      min_latency,
      max_latency,
      total_successes,
      total_failures,
      p95_latency,
      latency_sumsq
    FROM rows_to_insert
    ORDER BY user_site_id, hour_checked;
  `, [userID]);
  return result.rows
}