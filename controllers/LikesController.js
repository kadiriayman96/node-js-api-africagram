import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;

    const existPost = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!existPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: new NotFoundError("Post Not Found !!").message });
    }

    const newLike = await prisma.aime.create({
      data: {
        post_id: parseInt(postId),
        utilisateur_id: userId,
      },
    });

    const totalLikes = await prisma.aime.count({
      where: {
        post_id: parseInt(postId),
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ "Total de likes pour le post ": totalLikes });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export { likePost };
