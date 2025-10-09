import { Router } from "express"; 
import { addSite, getSites, deleteMultipleSites, changeNotifications, getStates, editSite } from "../Queries/siteQueries.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = Router();

router.post('/add-site', authMiddleware, async (req, res) => {
  try {
    let data = req.body;  
    const { url, title, interval, notifications} = data;
    let userID = req.cookies?.userID;
    
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

router.get('/get-sites', authMiddleware, async (req, res) => {
  try {
    let userID = req.cookies?.userID;

    if (userID) {
      let sites = await getSites(userID);
      return res.json(sites.rows);
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send();
  }
})

router.post('/get-states', authMiddleware, async (req, res) => {
  try {
    let siteIDs = req.body.siteIDs;

    if (siteIDs.length > 0) {
      let states = await getStates(siteIDs);
      return res.status(200).json(states.rows);
    }
    return res.json([]);
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

router.post('/delete-sites', authMiddleware, async (req, res) => {
  try {
    let siteIDs = req.body.siteIDs;  
    
    await deleteMultipleSites(siteIDs)
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send();
  }
})

router.post('/change-notifications', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;

    await changeNotifications(siteID);
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send()
  }
})

router.post('/edit-site', authMiddleware, async (req, res) => {
  try {
    let siteID = req.body.siteID;
    let newURL = req.body.url;
    let newTitle = req.body.title; 

    await editSite(siteID, newTitle, newURL);
    res.status(200).send();
    console.log('resposne sent')
  } catch (e) {
    return res.status(500).send();
  }
})

export default router