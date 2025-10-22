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

export async function fetchSiteState(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_SINGLE_SITE_STATE_URL, {
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

export async function fetchSiteURLAndTitle(siteID: number) {
  let response = await fetch(import.meta.env.VITE_GET_SINGLE_SITE_TITLE_URL, {
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
  return { lastChecked: data.last_check, currentStatus: data.status }
}

export function statusToBadgeProps(status: string) {
  switch (status) {
    case "online":
      return { variant: "default", text: "Online", className: "bg-green-50 text-green-800 ring-green-200" };
    case "down":
      return { variant: "destructive", text: "Down", className: "bg-red-50 text-red-800 ring-red-200" };
    default:
      return { variant: "secondary", text: "Unknown", className: "bg-gray-50 text-gray-800" };
  }
}