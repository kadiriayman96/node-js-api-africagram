import express from "express";
import { register, loginUser} from "../controllers/AuthController.js";
import validateLogin from "../middlewares/verifyLogin.js";
import validateRegister from "../middlewares/verifyRegister.js";

const routerAuth = express.Router();

routerAuth.post("/register", validateRegister ,register);
routerAuth.post("/login", validateLogin ,loginUser);


export default routerAuth;
