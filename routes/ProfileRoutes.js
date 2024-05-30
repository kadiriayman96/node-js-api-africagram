import express from "express";
import { profileCreate, getProfile } from "../controllers/ProfileController.js";
import verifyToken from "../middlewares/verifyToken.js";
import validateProfile from "../middlewares/validationProfile.js";

const routerProfile = express.Router();

routerProfile
  .post("/createProfile", validateProfile, verifyToken, profileCreate)
  .get("/profile", verifyToken, getProfile);

export default routerProfile;
