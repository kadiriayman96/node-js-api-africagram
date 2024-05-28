import jwt from "jsonwebtoken";

function generateToken(payload) {
  const token = jwt.sign(payload, "user_key", {
    expiresIn: "1h",
  });

  return token;
}

export default generateToken;
