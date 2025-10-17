// import { pool } from "../dbconfig.js";

// export async function getIncidents7D(siteID: number) {
//   const result = await pool.query(
//     `
//     SELECT hp.user_site_id, SUM(hp.total_failures) AS incidents
//     FROM hourly_pings hp
//     WHERE user_site_id = $1
//       AND hp.hour_checked >= NOW() - INTERVAL '7 days'
//     GROUP BY hp.user_site_id
//     ORDER BY hp.user_site_id
//     `,
//     [siteID]
//   );

//   const incidents = Number(result.rows[0]?.incidents ?? 0);
//   return incidents;
// }

// export async function getLatency7D(siteID: number) {
//     const result = await pool.query(
//     `
//       SELECT hp.user_site_id, ROUND(AVG(hp.average_latency)) as latency
//       FROM hourly_pings hp
//       WHERE user_site_id = ($1)
//         AND hp.hour_checked >= NOW() - INTERVAL '7 days'
//       GROUP BY hp.user_site_id
//       ORDER BY hp.user_site_id
//     `,
//     [siteID]
//   );

//   const lantency = Number(result.rows[0]?.latency ?? 0);
//   return lantency;
// }

// export async function getUptime7D(siteID: number) {
//   const result = await pool.query(`
//     SELECT
//       hp.user_site_id,
//       ROUND(
//         COALESCE(
//           (
//             COALESCE(SUM(hp.total_successes), 0)::numeric /
//             NULLIF(
//               (COALESCE(SUM(hp.total_successes), 0) + COALESCE(SUM(hp.total_failures), 0))::numeric,
//               0
//             )
//           ),
//           0
//         ),
//         3
//       ) AS uptime
//     FROM hourly_pings hp
//     WHERE user_site_id = ($1)
//       AND hp.hour_checked >= NOW() - INTERVAL '7 days'
//     GROUP BY hp.user_site_id
//     ORDER BY hp.user_site_id;
//   `, [siteID])

//   const uptime = Number(result.rows[0]?.uptime ?? 0);
//   return uptime;
// }

// export async function getUptimeAllSites7D(userID: number) {
//  const result = await pool.query(`
//   SELECT ROUND(AVG(uptime)::numeric, 3) AS avg_uptime
//   FROM (
//     SELECT
//       hp.user_site_id,
//       COALESCE(
//         (COALESCE(SUM(hp.total_successes),0)::numeric /
//         NULLIF((COALESCE(SUM(hp.total_successes),0) + COALESCE(SUM(hp.total_failures),0))::numeric, 0)
//         ),
//         0
//       ) AS uptime
//     FROM hourly_pings hp
//     WHERE hp.user_site_id IN (SELECT user_site_id FROM user_sites WHERE user_id = ($1))
//       AND hp.hour_checked >= NOW() - INTERVAL '7 days'
//     GROUP BY hp.user_site_id
//   ) AS per_site;
//  `, [userID])

//   const uptime = Number(result.rows[0]?.avg_uptime ?? 0);
//   return uptime;
// }

// export async function getLatencyAllSites7D(userID: number) {
//   const result = await pool.query(`
//     SELECT ROUND(AVG(latency)) as latency 
//     FROM (
//       SELECT hp.user_site_id, ROUND(AVG(hp.average_latency)) as latency
//       FROM hourly_pings hp
//       WHERE user_site_id IN (SELECT user_site_id FROM user_sites WHERE user_id = ($1))
//       AND hp.hour_checked >= NOW() - INTERVAL '7 days'
//       GROUP BY hp.user_site_id
//       ORDER BY hp.user_site_id
//     )
//   `, [userID])

//   const lantency = Number(result.rows[0]?.latency ?? 0);
//   return lantency;
// }

// export async function getState(siteID: number) {
  
//   const result = await pool.query(
//     `SELECT * FROM monitor_state WHERE monitor_id = ($1)`,
//     [siteID]
//   );

//   return result.rows[0]
// }