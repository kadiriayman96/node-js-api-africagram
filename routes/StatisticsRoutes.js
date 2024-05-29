import express from "express";
import getStatistics from "../controllers/StatisticsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const routerStatistics = express.Router();

// Routes for statistics
routerStatistics.get("/getAllAnalytics", verifyToken, getStatistics);

export default routerStatistics;
