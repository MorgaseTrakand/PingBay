import { insertPing, monitorStateUpdate } from "../Queries/cronQueries.js";

export type Row = {
  id: number,
  url: string
}

export type SiteRow = {
  id: number;        
  user_id?: number;      
  url: string;    
  title?: string;      
  check_interval?: number;  
  notifications_enabled?: boolean; 
  created_at?: string;             
};

export async function initialPing(site: SiteRow) {
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
}