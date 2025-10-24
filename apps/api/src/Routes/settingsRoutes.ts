import { Router } from "express"; 
import { authMiddleware } from "../utils/authMiddleware.js";
import { populateSampleData } from "../Queries/settingsQueries.js";
import { getSites } from "../Queries/siteQueries.js";

const router = Router();

router.get('/populate-sample-data', authMiddleware, async (req, res) => {
  try {
    let userID = req.cookies?.userID;

    if (userID) {
      let sites = (await getSites(userID)).rows;  
      if (sites.length <= 4) {
        await populateSampleData(userID);
        return res.status(200).json("Sample data successfully added!")
      }
      return res.status(500).json("Account limited to 6 total sites!")
    }
  } catch (e) {
    return res.status(500).json("Something went wrong with adding sample data!");
  }
});

export default router