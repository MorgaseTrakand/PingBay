type getSites = {
  numberOfSites: number
}

export async function getSites() {
  let response = await fetch(import.meta.env.VITE_GET_NUMBER_OF_SITES_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
  if (response.ok) {
    let data: getSites = await response.json();
    return data.numberOfSites
  }
  throw new Error(`Failed to fetch sites: ${response.status} ${response.statusText}`);
}

export async function getUptime() {
  let response = await fetch(import.meta.env.VITE_GET_OVERALL_UPTIME_7D_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
  if (response.ok) {
    let data = await response.json();
    return data
  }
  throw new Error(`Failed to fetch uptime: ${response.status} ${response.statusText}`);
}

export async function getLatency() {
  let response = await fetch(import.meta.env.VITE_GET_OVERALL_LATENCY_7D_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
  if (response.ok) {
    let data = await response.json();
    return data
  }
  throw new Error(`Failed to fetch latency: ${response.status} ${response.statusText}`);
}

export async function getIncidents() {
  let response = await fetch(import.meta.env.VITE_GET_OVERALL_INCIDENTS_7D_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
  if (response.ok) {
    let data = await response.json();
    return data
  }
  throw new Error(`Failed to fetch incidents: ${response.status} ${response.statusText}`);
}