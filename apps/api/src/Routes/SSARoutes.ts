import { Router } from "express"; 
import { getIncidents7D, getLatency7D, getUptime7D, getState } 
from "../Queries/SSAQueries.js";

const router = Router();

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

router.post('/get-single-site-state', async (req, res) => {
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

export default router