// complete le utilisateur

import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const prisma = new PrismaClient();

// Create profile
const profileCreate = async (req, res) => {
  try {
    const { sexe, pays, ville } = req.body;
    const userId = req.user.id;
    if (!sexe || !pays || !ville) {
      throw new BadRequestError("fill all required data");
    }

    const profile = await prisma.profile.create({
      data: {
        id_utilisateur: userId,
        sexe,
        pays,
        ville,
      },
    });

    return res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

// get profile
const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        id_utilisateur: req.user.id,
      },
    });

    if (!profile) {
      throw new NotFoundError("Profile Not Found!!");
    }

    return res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export { profileCreate, getProfile };
