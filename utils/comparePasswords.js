import bcrypt from "bcryptjs";

async function comparePasswords(password, hashedPassword) {
  const foundPassword = await bcrypt.compare(password, hashedPassword);
  return foundPassword;
}

export default comparePasswords;
