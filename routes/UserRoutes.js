import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/UserController.js";
import verifyToken from "../middlewares/verifyToken.js";
import validateUpdateUser from "../middlewares/validationUser.js";

const routerUser = express.Router();

// Routes for users
routerUser
  .put("/updateUser", verifyToken, validateUpdateUser, updateUser)
  .get("/userDetails", verifyToken, getUser)
  .delete("/deleteUser", verifyToken, deleteUser);

export default routerUser;
