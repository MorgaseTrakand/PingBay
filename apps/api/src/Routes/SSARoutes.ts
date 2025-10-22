import { Router } from "express"; 
import { getIncidents7D, getLatency7D, getUptime7D, getState, getHourlyLatencyData, getDailyLatencyData, getHourlyIncidentData, getDailyIncidentData, getHourlyUptimeData, getDailyUptimeData, getSiteURLAndTitle } 
from "../Queries/SSAQueries.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = Router();

router.post('/get-incidents-last-week-single-site', authMiddleware, async (req, res) => {
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

router.post('/get-latency-last-week-single-site', authMiddleware, async (req, res) => {
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

router.post('/get-uptime-last-week-single-site', authMiddleware, async (req, res) => {
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

router.post('/get-single-site-state', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getState(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-single-site-title', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getSiteURLAndTitle(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-hourly-latency-data', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getHourlyLatencyData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-daily-latency-data', authMiddleware, async (req, res) => {
    try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getDailyLatencyData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-hourly-incident-data', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getHourlyIncidentData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-daily-incident-data', authMiddleware, async (req, res) => {
    try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getDailyIncidentData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-hourly-uptime-data', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getHourlyUptimeData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/get-daily-uptime-data', authMiddleware, async (req, res) => {
    try {
    let siteID = req.body.siteID;

    if (!siteID) {
      return res.status(401).send();
    }

    return res.json(await getDailyUptimeData(siteID))
  } catch (e) {
    return res.status(500).json(e)
  }
})

export default router