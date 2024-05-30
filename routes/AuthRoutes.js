import express from "express";
import { register, loginUser} from "../controllers/AuthController.js";
import validateLogin from "../middlewares/validationLogin.js";
import validateRegister from "../middlewares/validationRegister.js";

const routerAuth = express.Router();

routerAuth.post("/register", validateRegister ,register);
routerAuth.post("/login", validateLogin ,loginUser);


export default routerAuth;
