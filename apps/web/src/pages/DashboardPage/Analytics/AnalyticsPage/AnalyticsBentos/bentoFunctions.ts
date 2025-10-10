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