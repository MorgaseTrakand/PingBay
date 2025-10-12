import { Router } from "express"; 
import { getDailyData, getHourlyData, getNumberOfSites } from "../Queries/analyticsQueries.js";

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
})

export default router