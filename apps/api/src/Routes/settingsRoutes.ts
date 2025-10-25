import { Router } from "express"; 
import { authMiddleware } from "../utils/authMiddleware.js";
import { populateSampleData } from "../Queries/settingsQueries.js";
import { getSites } from "../Queries/siteQueries.js";
import { initialPing } from "../utils/pingCodeExports.js";

const router = Router();

router.get('/populate-sample-data', authMiddleware, async (req, res) => {
  try {
    let userID = req.cookies?.userID;

    if (userID) {
      let sites = (await getSites(userID)).rows;
      const hasBBC = sites.some(site => site.url === 'https://www.bbc.com');
      const hasNYT = sites.some(site => site.url === 'https://www.nytimes.com');

      if (hasBBC || hasNYT) {
        return res.status(400).json("Sample data already exists for this account.");
      }
      if (sites.length <= 4) {
        let sites = await populateSampleData(userID);

        sites.forEach((site) => {
          initialPing({"id": site.id, "url": site.url})
        })
        return res.status(200).json("Sample data successfully added!")
      }
      return res.status(400).json("Account limited to 6 total sites!")
    }
  } catch (e) {
    return res.status(500).json("Something went wrong with adding sample data!");
  }
});

export default router