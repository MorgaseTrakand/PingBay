import { Router } from "express"; 
import { pool } from "./dbconfig.js";
import { findUser, createUser } from "./queries.js";

const router = Router();

router.post('/signup', async (req, res) => {
  let data = req.body;
  let email: string = data.email;
  let password: string = data.password;

  try {
    let user: any = await findUser(email);

    if (user.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    let result: any = await createUser(email, password);

    if (result.rowCount > 0) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
    } catch (err) {
      console.error("Error in signup:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
});

router.get("/login", (req, res) => {
  let data = req.body;
  let email: string = data.email;
  let password: string = data.password;

});

export default router