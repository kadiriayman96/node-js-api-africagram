import express from "express";
import { register, loginUser, getUsers, deleteUsers } from "../controllers/AuthController.js";
import validateLogin from "../middlewares/verifyLogin.js";
import validateRegister from "../middlewares/verifyRegister.js";

const routerAuth = express.Router();

routerAuth.post("/register", validateRegister ,register);
routerAuth.post("/login", validateLogin ,loginUser);
routerAuth.get("/user", getUsers);
routerAuth.delete("/user", deleteUsers);


export default routerAuth;
