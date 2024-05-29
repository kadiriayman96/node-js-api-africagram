import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "./error";

const prisma = new PrismaClient();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/jpeg")) {
    return cb(new BadRequestError("Only JPEG format is allowed"), false);
  }
  if (file.size > 5 * 1024 * 1024) {
    return cb(new BadRequestError("Image size must be less than 5MB"), false);
  }
  cb(null, true);
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
}).single("image");

/**
 * Create post
 */
export const createPost = async (req, res, next) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;
    let image_url = null;

    if (req.file) {
      image_url = req.file.path;
    }

    const post = await prisma.post.create({
      data: {
        caption,
        utilisateur_id: userId,
        image_url,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all posts
 */
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        caption: true,
        image_url: true,
        utilisateur_id: true,
        date_creation: true,
        date_modification: true,
      },
    });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Get one post by id
 */
export const getPostById = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};
