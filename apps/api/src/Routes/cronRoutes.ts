import { Router } from "express"; 
import { getSitesBasedOnInterval, insertPing, downSample, monitorStateUpdate } from "../Queries/cronQueries.js";
import { limitFunction } from "p-limit";
import type { QueryResult } from "pg";

const router = Router();

type Row = {
  id: number,
  url: string
}

type SiteRow = {
  id: string;        
  user_id: string;      
  url: string;    
  title: string;      
  check_interval: number;  
  notifications_enabled: boolean; 
  created_at: string;             
};

//const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const pingSite = limitFunction(async (site: Row) => {
  try {
    const t0 = performance.now();
    const response = await fetch(site.url, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "PingBay" },
      cache: "no-store",
    });
    const ms = Math.round(performance.now() - t0);

    const success = response.ok;
    const statusCode = response.status;

    await Promise.all([
      insertPing(site.id, success, ms),
      monitorStateUpdate(site.id, new Date(), success, statusCode, ms),
    ]);
  } catch (e) {
    console.error("Ping failed for", site.url, e);

    await Promise.all([
      insertPing(site.id, false, null),
      monitorStateUpdate(site.id, new Date(), false, 500, null),
    ]);
  }
}, { concurrency: 50 });

const pingSitesWrapper = limitFunction(async (sites: SiteRow[]) => {
  const promises = sites.map((site) =>
    pingSite({
      ...site,
      id: Number(site.id),
    })
  );

  await Promise.allSettled(promises);
}, {concurrency: 50})

router.get("/handle-pings", async (req, res) => {
  try {
    const now = new Date();
    now.setSeconds(0, 0);
    const currentMinute = now.getMinutes();
    let interval;

    if (currentMinute === 0) {
      interval = 3600
    } else if (currentMinute % 5 === 0) {
      interval = 300
    } else {
      interval = 60
    }
    const result: QueryResult<SiteRow> = await getSitesBasedOnInterval(interval);
    const sites: SiteRow[] = result.rows;

    pingSitesWrapper(sites)

    if (currentMinute === 0) {
      downSample();
    }
    return res.json(sites);
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default router;