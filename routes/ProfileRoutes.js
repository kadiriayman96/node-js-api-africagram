import express from "express";
import {profileCreate, getProfile} from "../controllers/ProfileController.js";
import verifyToken from "../middlewares/verifyToken.js";

const routerProfile = express.Router();

routerProfile.post("/createprofile",verifyToken, profileCreate)
             .post("/profile", verifyToken, getProfile)

export default routerProfile;