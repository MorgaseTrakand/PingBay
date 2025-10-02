import { Router } from "express"; 
import { findUser, createUser } from "../queries.js";
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
    return res.status(401).send();
  } catch (e) {
    return res.status(401).send();
  }
});

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

    if (result.rowCount > 0) {
      const token = generateToken({
        userId: user.id,
      });
      res.cookie('accessToken', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        //secure: false,
        sameSite: 'strict'
      }).cookie('isLoggedIn', 'true', {
        maxAge: 1000 * 60 * 60
      })

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
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken({
    userId: user.id,
  });
  res.cookie('accessToken', token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    //secure: false,
    sameSite: 'strict'
  }).cookie('isLoggedIn', 'true', {
    maxAge: 1000 * 60 * 60
  })
  return res.status(200).json({ message: "success" })
});

router.get('/logout', (req, res) => {
  try {
    return res.clearCookie('isLoggedIn').clearCookie('accessToken').status(200).send();
  } catch (e) {
    return res.status(500).send();
  }
})

export default router