import express from "express";
import { register, loginUser, getUsers, deleteUsers } from "../controllers/AuthController.js";

const routerAuth = express.Router();

routerAuth.post("/register", register);
routerAuth.post("/login", loginUser);
routerAuth.get("/user", getUsers);
routerAuth.delete("/user", deleteUsers);


export default routerAuth;
