export async function fetchHourlyIncidentData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_HOURLY_INCIDENT_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch hourly incident data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}

export async function fetchDailyIncidentData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_DAILY_INCIDENT_CHART_DATA, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch daily incident data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data
}