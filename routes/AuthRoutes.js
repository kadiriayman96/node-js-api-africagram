
import express from "express"
const routerAuth = express.Router()
import {register, loginUser}  from "../controllers/AuthController.js"

routerAuth.route("/register")
            .post(register)

routerAuth.route("/login")
            .post(loginUser)

export default routerAuth