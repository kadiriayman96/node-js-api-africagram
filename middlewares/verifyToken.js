import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

function verifyToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnAuthenticatedError("No token provided");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new UnAuthenticatedError("No token provided");
    }

    const payload = jwt.verify(token, "user_key");
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ error: error.message });
  }
}

export default verifyToken;
