import { Router } from "express"; 

const router = Router();

router.post('/add-site', (req, res) => {
  let data = req.body;  
  const { url, title, interval, notifications} = data;

  console.log(url, title, interval, notifications)
  return res.status(500).send();
})

export default router