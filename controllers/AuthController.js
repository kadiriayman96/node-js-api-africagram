import { PrismaClient } from "@prisma/client";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/jwt.js";
import comparePasswords from "../utils/comparePasswords.js";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

// User Register
const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if all the data are filled
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: new BadRequestError("Please fill all the data").message,
        });
    }

    // Check if the user already exists
    const existingUser = await prisma.utilisateur.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: new BadRequestError("User already exists").message });
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Save the user in the database
    const newUser = await prisma.utilisateur.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isAdmin: false,
      },
    });

    // Generate Token
    const token = generateToken({ user: newUser }, "user_key");

    // Send response and token
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// User Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Please fill all the data").message,
      });
    }

    // Find the user
    const user = await prisma.utilisateur.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: new NotFoundError("User not found").message });
    }

    // Compare passwords
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: new UnAuthenticatedError("Incorrect email or password").message,
      });
    }

    // Generate Token
    const token = generateToken({ user: user }, "user_key");
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};



// get users

const getUsers = async (req, res) => {
  const users = await prisma.utilisateur.findMany()
  res.send(users)
}
// delete

const deleteUsers = async (req, res) => {
  const users = await prisma.utilisateur.deleteMany()
  res.send(users)
}

export { register, loginUser, getUsers, deleteUsers };
