import express from "express";
import cors from "cors";

import { getUsers } from "./queries.js";

import authRoutes from "./auth.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
  
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", async (req, res) => {
  try {
    let users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error(error)
  }
})
async function singlePing(url: string) {
  const t0 = performance.now();
  await fetch(url, {
    method: "HEAD",
    redirect: "manual",
    signal: AbortSignal.timeout(5000),
    headers: { "User-Agent": "PingBay" },
    cache: "no-store",
  })
  const ms = Math.round(performance.now() - t0); // precise elapsed time
  return ms
}
app.post("/ping", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
