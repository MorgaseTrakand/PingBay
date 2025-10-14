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
  return 0
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
  return 0
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
  return 0
}