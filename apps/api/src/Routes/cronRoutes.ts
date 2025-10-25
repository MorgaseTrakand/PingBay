import { Router } from "express"; 
import { getSitesBasedOnInterval, downSample } from "../Queries/cronQueries.js";
import { limitFunction } from "p-limit";
import type { QueryResult } from "pg";
import { SiteRow, initialPing } from "../utils/pingCodeExports.js";

const router = Router();

const pingSite = limitFunction(async (site: SiteRow) => {
  await initialPing(site);
}, { concurrency: 50 });

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

    console.log(`pinging ${result.rows.length} sites`)
    
    for (let i = 0; i < sites.length; i++) {
      pingSite(sites[i])
    }

    if (currentMinute === 0) {
      downSample();
    }
    return res.json(sites);
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default router;