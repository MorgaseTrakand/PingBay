import { Router } from "express"; 
import { getDailyData, getHourlyData, getNumberOfSites, getIncidents7D, 
  getLatency7D, getUptime7D, getUptimeAllSites7D, getLatencyAllSites7D } 
from "../Queries/analyticsQueries.js";

const router = Router();

router.get('/get-number-of-sites', async (req, res) => {
  try {
    let userID = req.cookies?.userID;
    let numberOfSites = await getNumberOfSites(userID)

    if (numberOfSites.n) {
      return res.json({numberOfSites: numberOfSites.n})
    }
    return res.status(500).json("Something went wrong!");
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/get-hourly-data', async (req, res) => {
  try {
    let userID = req.cookies?.userID;

    if (!userID) {
      return res.status(401).send();
    }

    return res.json(await getHourlyData(userID))
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

router.get('/get-daily-data', async (req, res) => {
  try {
    let userID = req.cookies?.userID;

    if (!userID) {
      return res.status(401).send();
    }

    return res.json(await getDailyData(userID))
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
});

router.post('/get-incidents-last-week-single-site', async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(500).send();
    }

    return res.json(await getIncidents7D(siteID));
  } catch (e) { 
    return res.status(500).json(e)
  }
});

router.post('/get-latency-last-week-single-site', async (req, res) => {
    try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(500).send();
    }

    return res.json(await getLatency7D(siteID));
  } catch (e) { 
    return res.status(500).json(e)
  }
});

router.post('/get-uptime-last-week-single-site', async (req, res) => {
    try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(500).send();
    }

    return res.json(await getUptime7D(siteID));
  } catch (e) { 
    return res.status(500).json(e)
  }
});

router.get('/get-uptime-last-week-overall', async (req, res) => {
    try {
    let userID = req.cookies?.userID;

    if (!userID) {
      return res.status(401).send();
    }

    return res.json(await getUptimeAllSites7D(userID))
  } catch (e) { 
    return res.status(500).json(e)
  }
});

router.get('/get-latency-last-week-overall', async (req, res) => {
    try {
    let userID = req.cookies?.userID;

    if (!userID) {
      return res.status(401).send();
    }

    return res.json(await getLatencyAllSites7D(userID))
  } catch (e) { 
    return res.status(500).json(e)
  }
});

export default router