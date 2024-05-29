import express from "express";
import { register, loginUser } from "../controllers/AuthController.js";

const routerAuth = express.Router();

routerAuth.post("/register", register);
routerAuth.post("/login", loginUser);

export default routerAuth;
