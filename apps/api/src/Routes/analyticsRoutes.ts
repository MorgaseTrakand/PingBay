import { Router } from "express"; 
import { getNumberOfSites } from "../Queries/analyticsQueries.js";

const router = Router();

router.get('/get-number-of-sites', async (req, res) => {
  try {
    let userID = req.cookies?.userID;
    let numberOfSites = await getNumberOfSites(userID)

    if (numberOfSites.n) {
      return res.json({numberOfSites: numberOfSites.n})
    }
    return res.status(401).json("Something went wrong!");
  } catch (e) {
    return res.status(401).json(e);
  }
});

export default router