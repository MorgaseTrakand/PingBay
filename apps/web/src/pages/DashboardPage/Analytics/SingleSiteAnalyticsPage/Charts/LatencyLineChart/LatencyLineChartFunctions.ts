export async function fetchHourlyLatencyData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_HOURLY_LATENCY_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch hourly latency data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}

export async function fetchDailyLatencyData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_DAILY_LATENCY_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch daily latency data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}