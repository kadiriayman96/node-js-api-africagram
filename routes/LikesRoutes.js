import express from "express";
import { likePost } from "../controllers/LikesController.js";
import verifyToken from "../middlewares/verifyToken.js";
import validateAime from "../middlewares/validationAime.js";

const routerLikes = express.Router();

routerLikes.post("/addLike", validateAime, verifyToken, likePost);

export default routerLikes;
