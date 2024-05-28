import bcrypt from "bcryptjs";

function comparePasswords(password, hashedPassword) {
  const foundPassword = bcrypt.compare(password, hashedPassword);
  return foundPassword;
}

export default comparePasswords;
