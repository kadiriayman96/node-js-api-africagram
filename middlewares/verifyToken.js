import jwt from "jsonwebtoken";
import { UnAuthenticatedMessage } from "../errors";

function verifyToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      UnAuthenticatedMessage("Unauthorized");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      UnAuthenticatedMessage("Invalid Token");
    }

    const payload = jwt.verify(token, "user_key");
    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).send(error.name);
  }
}

export default verifyToken;
