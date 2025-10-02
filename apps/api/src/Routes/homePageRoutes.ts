import { Router } from "express"; 

const router = Router();

async function singlePing(url: string) {
  const t0 = performance.now();
  await fetch(url, {
    method: "HEAD",
    redirect: "manual",
    signal: AbortSignal.timeout(5000),
    headers: { "User-Agent": "PingBay" },
    cache: "no-store",
  })
  const ms = Math.round(performance.now() - t0);
  return ms
}

router.post("/ping", async (req, res) => {
  const url : string = req.body.url;
  let result: number[] = [];

  for (let i = 0; i < 5; i++) {
    result.push(await singlePing(url))
    await setTimeout(() => {}, 250)
  }
  let response = { "average": 0, "fastest": 0};
  response.fastest = Math.min(...result);
  let sum: number = 0;
  for (let i = 0; i < result.length; i++) {
    sum+=result[i]
  }
  response.average = Math.round(sum/result.length);
  res.json(response);
})

export default router