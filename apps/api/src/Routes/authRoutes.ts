import { Router } from "express"; 
import { findUser, createUser } from "../Queries/authQueries.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";

const router = Router();

router.get('/verify', async (req, res) => {
  try {
    let token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).send();
    }
    if (verifyToken(token)?.userId) {
      return res.status(200).send();
    }
    return res.status(401).json("Something went wrong!");
  } catch (e) {
    return res.status(401).json(e);
  }
});

router.post('/signup', async (req, res) => {
  try {
    let data = req.body;  
    let email: string = data.email;
    let password: string = data.password;
    let user: any = await findUser(email);

    if (user.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }
    
    let result: any = await createUser(email, password);
    let userID = result.rows[0].id

    if (result.rowCount > 0) {
      const token = generateToken({
        userId: userID,
      });
      console.log('token', token)
      res.cookie('accessToken', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        //secure: false,
        sameSite: 'strict'
      }).cookie('userID', userID, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
      })
      console.log('sending cookies over????')
      console.log('userID', userID)
      return res.status(200).json({ message: "success" })
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
    return res.json({ error: "Invalid email or password" });
  }

  const token = generateToken({
    userId: user.id,
  });
  res.cookie('accessToken', token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    //secure: false,
    sameSite: 'strict'
  }).cookie('userID', user.id, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: 'strict'
  })
  
  return res.status(200).json({ message: "success" })
});

router.get('/logout', (req, res) => {
  try {
    return res.clearCookie('isLoggedIn').clearCookie('userID').clearCookie('accessToken').status(200).send();
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default router