export async function fetchIncidentsData(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_INCIDENTS_7D_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Failed to fetch incidents: ${response.status} ${response.statusText}`);
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
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Failed to fetch uptime: ${response.status} ${response.statusText}`);
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
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Failed to fetch latency: ${response.status} ${response.statusText}`);
}

export async function handleRefresh(siteID: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  setLoading(true)
  let response = await fetch(import.meta.env.VITE_GET_SINGLE_SITE_STATE_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ siteID: siteID })
  })
  if (!response.ok) {
    throw new Error(`Failed to refresh data: ${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  setLoading(false)
  return { last_checked: data.last_check, status: data.status }
}