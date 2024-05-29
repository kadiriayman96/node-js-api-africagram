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
      throw new BadRequestError("Caption and image are required !!");
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
    return res.status(error.statusCode).json({ error: error.message });
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
      throw new NotFoundError("No posts found !!");
    }

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

export { createPost, getAllPosts };
