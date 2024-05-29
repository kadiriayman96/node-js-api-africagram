import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const getStatistics = async (req, res) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: new BadRequestError("Unauthorized access! Only admins can access")
        .message,
    });
  }

  try {
    // Total users count
    const totalUsers = await prisma.utilisateur.count();

    if (totalUsers === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("No users found").message,
      });
    }

    // Users by country
    const usersByCountry = await prisma.profile.groupBy({
      by: ["pays"],
      _count: {
        id: true,
      },
    });

    if (usersByCountry.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("No users by country found").message,
      });
    }

    // Total posts count
    const totalPosts = await prisma.post.count();

    // Average posts per user
    const averagePostsPerUser = totalPosts / totalUsers;

    // Gender distribution
    const genderDistribution = await prisma.profile.groupBy({
      by: ["sexe"],
      _count: {
        id: true,
      },
    });

    if (genderDistribution.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("No gender distribution found").message,
      });
    }

    res.status(StatusCodes.OK).json({
      totalUsers,
      usersByCountry,
      averagePostsPerUser,
      genderDistribution,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default getStatistics;
