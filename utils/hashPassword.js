import bcrypt from "bcryptjs";

function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

export default hashPassword;
