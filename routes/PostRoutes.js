import express from "express";
import { createPost, getAllPosts } from "../controllers/PostController.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/imageUpload.js";

const router = express.Router();

// Routes for posts
router.post("/createPost", verifyToken, upload.single("image"), createPost);
router.get("/allPosts", verifyToken, getAllPosts);

export default router;
