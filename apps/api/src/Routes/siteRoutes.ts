import { Router } from "express"; 
import { verifyToken } from "../utils/jwt.js";
import { addSite, getSites } from "../Queries/siteQueries.js";

const router = Router();

router.post('/add-site', async (req, res) => {
  try {
    let data = req.body;  
    const { url, title, interval, notifications} = data;
    let userID = req.cookies?.userID;
    
    let token = req.cookies?.accessToken;
    if (!token || !userID || !verifyToken(token)?.userId) {
      return res.status(401).send();
    }
    
    let sites = (await getSites(userID)).rows;
    const isDuplicate = sites.some(site => site.url === url || site.title === title);

    if (isDuplicate) {
      return res.status(500).json("You already have a site with this title or URL.");
    }

    await addSite(userID, url, title, interval, notifications);
    return res.status(200).send();
  } catch (e) {
    console.log(e)
    return res.status(500).json("Something went wrong!");
  }
})

router.post('/get-sites', async (req, res) => {
  try {
    let userID = req.cookies?.userID;
    
    if (userID) {
      let sites = await getSites(userID);
      return res.json(sites.rows);
    }
  } catch (e) {
    return res.status(500).send();
  }
})

router.post('/delete-site', async (req, res) => {

})

export default router