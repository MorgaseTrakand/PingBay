export type State = {
  monitor_id: string,
  last_check: Date,
  status: boolean,
  last_status_code: number,
  last_latency_ms: number,
  consecutive_fails: number,
  consecutive_successes: number
};

export async function fetchDataAPI() {
  let response = await fetch(import.meta.env.VITE_GET_SITES_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  let sites = await response.json();
  let siteIDs = sites.map((site: any) => site.id);
  response = await fetch(import.meta.env.VITE_GET_STATE_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteIDs: siteIDs })
  })
  let stateData: State[] = await response.json();
  let mergedSites = sites.map((site: any) => {
    const state = stateData.find(s => s.monitor_id === site.id);
    return {
      ...site,
      last_checked: state ? state.last_check : null,
      status: state ? state.status : null,
    };
  });
  return mergedSites
}