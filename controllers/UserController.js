// rud user
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const prisma = new PrismaClient();

const updateUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Please fill all the data !").message,
      });
    }

    const user = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }
    console;
    const userUpdated = await prisma.utilisateur.update({
      where: {
        id: req.user.id,
      },
      data: {
        firstname,
        lastname,
        email,
      },
    });

    return res.status(StatusCodes.OK).json(userUpdated);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const existUser = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        profile: true,
      },
    });

    if (!existUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }

    const existProfile = await prisma.profile.findUnique({
      where: {
        id_utilisateur: req.user.id,
      },
    });

    const existPosts = await prisma.post.findMany({
      where: {
        utilisateur_id: req.user.id,
      },
    });
    if (!existProfile || !existPosts) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Cant find Profile or Post to delete. Please try again later.",
      });
    }

    let deleteProfile = prisma.profile.delete({
      where: {
        id_utilisateur: req.user.id,
      },
    });
    console.log(deleteProfile);
    let deletePosts = prisma.post.deleteMany({
      where: {
        utilisateur_id: req.user.id,
      },
    });
    const userDeleted = prisma.utilisateur.delete({
      where: {
        id: req.user.id,
      },
    });
    const deleteDone = await prisma.$transaction([
      deletePosts,
      deleteProfile,
      userDeleted,
    ]);

    return res.status(StatusCodes.NO_CONTENT).json("Delete Done");
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export { updateUser, deleteUser, getUser };
