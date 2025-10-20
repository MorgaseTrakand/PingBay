import { Router } from "express"; 
import { getDailyData, getHourlyData, getNumberOfSites, getUptimeAllSites7D, getLatencyAllSites7D, getIncidentsAllSites7D } 
from "../Queries/analyticsQueries.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = Router();

router.get('/get-number-of-sites', authMiddleware, async (req, res) => {
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

router.get('/get-hourly-data', authMiddleware, async (req, res) => {
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

router.get('/get-daily-data', authMiddleware, async (req, res) => {
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

router.get('/get-uptime-last-week-overall', authMiddleware, async (req, res) => {
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

router.get('/get-latency-last-week-overall', authMiddleware, async (req, res) => {
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

router.get('/get-incidents-last-week-overall', authMiddleware, async (req, res) => {
    try {
    let userID = req.cookies?.userID;

    if (!userID) {
      return res.status(401).send();
    }

    return res.json(await getIncidentsAllSites7D(userID))
  } catch (e) { 
    return res.status(500).json(e)
  }
})

export default router