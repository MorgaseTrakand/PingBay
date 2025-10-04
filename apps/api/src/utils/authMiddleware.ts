import { verifyToken } from "./jwt.js";

export function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies?.accessToken;
    const userID = req.cookies?.userID;

    if (!token || !userID) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.userId !== userID) {
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}