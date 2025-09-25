import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

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
    await setTimeout(() => {}, 200)
  }
  console.log(result)
  res.json(result);
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
