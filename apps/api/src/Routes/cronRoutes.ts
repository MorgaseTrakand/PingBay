import { Router } from "express"; 
import { getSitesBasedOnInterval, insertPing, downSample} from "../Queries/cronQueries.js";
import { limitFunction } from "p-limit";

const router = Router();

type Row = {
  id: number,
  url: string
}

//const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const pingSite = limitFunction(async (site: Row) => {
  try {
    const t0 = performance.now();
    let response = await fetch(site.url, { 
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "PingBay" },
      cache: "no-store",
    })
    const ms = Math.round(performance.now() - t0);

    insertPing(site.id, response.status < 400 ? true : false, ms)
  } catch (e) {
    console.error('Ping failed for', site.url, e);
    insertPing(site.id, false, -1);
  }
}, {concurrency: 50})

const pingSitesWrapper = limitFunction(async (sites: Array<Row>) => {
  for (let i = 0; i < sites.length; i++) {
    pingSite(sites[i])
  }
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

    let sites = await getSitesBasedOnInterval(interval);
    pingSitesWrapper(sites.rows);

    if (currentMinute === 0) {
      downSample();
    }
    return res.json(sites.rows);
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default router;