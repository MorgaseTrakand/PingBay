export async function fetchIncidentsData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_INCIDENTS_7D_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  let data = await response.json();
  return data
}

export async function fetchUptimeData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_UPTIME_7D_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  let data = await response.json();
  return data
}

export async function fetchAvgLatencyData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_LATENCY_7D_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  let data = await response.json();
  return data
}