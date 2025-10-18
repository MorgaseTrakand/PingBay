export async function fetchHourlyUptimeData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_HOURLY_UPTIME_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch hourly uptime data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}

export async function fetchDailyUptimeData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_DAILY_UPTIME_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch daily uptime data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}