import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

// Create Post
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;

    if (!caption || !req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Please fill all the data !").message,
      });
    }

    const image_url = req.file.path;
    const post = await prisma.post.create({
      data: {
        caption,
        utilisateur_id: userId,
        image_url,
      },
    });

    return res.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        utilisateur_id: req.user.id,
      },
      select: {
        id: true,
        caption: true,
        image_url: true,
        date_creation: true,
        date_modification: true,
      },
    });

    if (posts.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("No posts found !!").message,
      });
    }

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export { createPost, getAllPosts };
