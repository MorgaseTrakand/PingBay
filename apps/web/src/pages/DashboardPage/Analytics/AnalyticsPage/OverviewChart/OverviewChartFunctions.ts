export async function fetchHourlyData() {
  let response = await fetch(import.meta.env.VITE_GET_HOURLY_CHART_DATA, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  let data = await response.json();
  return data
}

export async function fetchDailyData() {
  let response = await fetch(import.meta.env.VITE_GET_DAILY_CHART_DATA, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  let data = await response.json();
  return data
}