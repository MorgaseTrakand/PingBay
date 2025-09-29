import { Router } from "express"; 
import { findUser, createUser } from "./queries.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    let data = req.body;  
    let email: string = data.email;
    let password: string = data.password;
    let user: any = await findUser(email);

    if (user.rows.length > 0) {
      console.log('user already exists')
      return res.status(409).json({ error: "User already exists" });
    }
    
    let result: any = await createUser(email, password);
    console.log(result)
    if (result.rowCount > 0) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ error: "Failed to create user" });
    }
    } catch (err) {
      console.error("Error in signup:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    
});

router.post("/login", async (req, res) => {
  let data = req.body;
  let email: string = data.email;
  let password: string = data.password;

  let result: any = await findUser(email);
  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  return res.status(200).json({ message: "success" })
});

export default router