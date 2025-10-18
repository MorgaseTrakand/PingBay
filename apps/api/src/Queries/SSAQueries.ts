import { pool } from "../dbconfig.js";

export async function getIncidents7D(siteID: number) {
  const result = await pool.query(
    `
    SELECT hp.user_site_id, SUM(hp.total_failures) AS incidents
    FROM hourly_pings hp
    WHERE user_site_id = $1
      AND hp.hour_checked >= NOW() - INTERVAL '7 days'
    GROUP BY hp.user_site_id
    ORDER BY hp.user_site_id
    `,
    [siteID]
  );

  const incidents = Number(result.rows[0]?.incidents ?? 0);
  return incidents;
}

export async function getLatency7D(siteID: number) {
    const result = await pool.query(
    `
      SELECT hp.user_site_id, ROUND(AVG(hp.average_latency)) as latency
      FROM hourly_pings hp
      WHERE user_site_id = ($1)
        AND hp.hour_checked >= NOW() - INTERVAL '7 days'
      GROUP BY hp.user_site_id
      ORDER BY hp.user_site_id
    `,
    [siteID]
  );

  const lantency = Number(result.rows[0]?.latency ?? 0);
  return lantency;
}

export async function getUptime7D(siteID: number) {
  const result = await pool.query(`
    SELECT
      hp.user_site_id,
      ROUND(
        COALESCE(
          (
            COALESCE(SUM(hp.total_successes), 0)::numeric /
            NULLIF(
              (COALESCE(SUM(hp.total_successes), 0) + COALESCE(SUM(hp.total_failures), 0))::numeric,
              0
            )
          ),
          0
        ),
        3
      ) AS uptime
    FROM hourly_pings hp
    WHERE user_site_id = ($1)
      AND hp.hour_checked >= NOW() - INTERVAL '7 days'
    GROUP BY hp.user_site_id
    ORDER BY hp.user_site_id;
  `, [siteID])

  const uptime = Number(result.rows[0]?.uptime ?? 0);
  return uptime;
}

export async function getState(siteID: number) {
  
  const result = await pool.query(
    `SELECT * FROM monitor_state WHERE monitor_id = ($1)`,
    [siteID]
  );

  return result.rows[0]
}

export async function getHourlyLatencyData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
        'date', hp.hour_checked,
        'latency', hp.average_latency
      ) ORDER BY hp.hour_checked
    ) AS result
    FROM hourly_pings hp
    WHERE hp.user_site_id = ($1);
    `, [siteID])

  const data = result.rows.map(row => row.result)[0];
  return data
}

export async function getDailyLatencyData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
        'date', date,
        'latency', latency
      ) ORDER BY date
    ) AS result
    FROM (
      SELECT
        DATE(hp.hour_checked) AS date,
        AVG(hp.average_latency) AS latency
      FROM hourly_pings hp
      WHERE hp.user_site_id = $1
      GROUP BY DATE(hp.hour_checked)
      ORDER BY DATE(hp.hour_checked)
    ) sub;
  `, [siteID])

  const data = result.rows.map(row => row.result)[0];
  return data
}

export async function getHourlyIncidentData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
        'date', date,
        'incidents', incidents
      ) ORDER BY date
    ) AS result
    FROM (
      SELECT
        hp.hour_checked::timestamptz AS date,
        SUM(hp.total_failures) AS incidents
      FROM hourly_pings hp
      WHERE hp.user_site_id = ($1)
      GROUP BY hp.hour_checked
      ORDER BY hp.hour_checked
    ) sub;
  `, [siteID])

  const data = result.rows.map(row => row.result)[0];
  return data
}

export async function getDailyIncidentData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
        'date', date,
        'incidents', incidents
      ) ORDER BY date
    ) AS result
    FROM (
      SELECT
        DATE(hp.hour_checked::timestamptz) AS date,
        SUM(hp.total_failures) AS incidents
      FROM hourly_pings hp
      WHERE hp.user_site_id = ($1)
      GROUP BY DATE(hp.hour_checked)
      ORDER BY DATE(hp.hour_checked)
    ) sub;
  `, [siteID])

  const data = result.rows.map(row => row.result)[0];
  return data
}

export async function getHourlyUptimeData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
      'date', date,
      'uptime', CAST(successes AS NUMERIC) / (successes + failures)
      ) ORDER BY date
    ) AS result
    FROM (
      SELECT
      hp.hour_checked::timestamptz AS date,
      SUM(hp.total_failures) AS failures,
      SUM(hp.total_successes) AS successes
      FROM hourly_pings hp
      WHERE hp.user_site_id = ($1)
      GROUP BY hp.hour_checked
      ORDER BY hp.hour_checked
    ) sub;
  `, [siteID])

  const data = result.rows.map(row => row.result)[0];
  return data
}

export async function getDailyUptimeData(siteID: number) {
  const result = await pool.query(`
    SELECT json_agg(
      json_build_object(
      'date', DATE(date),
      'uptime', CAST(successes AS NUMERIC) / (successes + failures)
      ) ORDER BY DATE(date)
    ) AS result
    FROM (
      SELECT
      DATE(hp.hour_checked::timestamptz) AS date,
      SUM(hp.total_failures) AS failures,
      SUM(hp.total_successes) AS successes
      FROM hourly_pings hp
      WHERE hp.user_site_id = ($1)
      GROUP BY DATE(hp.hour_checked)
      ORDER BY DATE(hp.hour_checked)
    ) sub;
  `, [siteID])
  const data = result.rows.map(row => row.result)[0];
  return data
}