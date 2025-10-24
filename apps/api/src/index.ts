import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import homePageRoutes from "./Routes/homePageRoutes.js";
import siteRoutes from "./Routes/siteRoutes.js";
import cronRoutes from "./Routes/cronRoutes.js";
import analyticsRoutes from "./Routes/analyticsRoutes.js";
import SSARoutes from "./Routes/SSARoutes.js";
import settingRoutes from "./Routes/settingsRoutes.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/auth', authRoutes);
app.use('/homepage', homePageRoutes);
app.use('/site', siteRoutes);
app.use('/cron', cronRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/ssa', SSARoutes);
app.use('/settings', settingRoutes)
  
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});