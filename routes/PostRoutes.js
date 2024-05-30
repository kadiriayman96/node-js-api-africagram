import express from "express";
import { createPost, getAllPosts } from "../controllers/PostController.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/imageUpload.js";

const routerPost = express.Router();

// Routes for posts
routerPost.post("/createPost", verifyToken, upload.single("image"), createPost);
routerPost.get("/allPosts", verifyToken, getAllPosts);

export default routerPost;
