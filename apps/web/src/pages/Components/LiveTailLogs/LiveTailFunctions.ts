export async function getLogs() {
  let response = await fetch(import.meta.env.VITE_GET_LIVE_LOGS_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (response.ok) {
    let data = await response.json()
    return data
  }
  throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
}