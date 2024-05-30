import Joi from "joi";
import { BadRequestError } from "../errors/index.js";
import { Prisma } from "@prisma/client";

const validateProfile = async (req, res, next) => {
  const profileSchema = Joi.object({
    ville: Joi.string().min(3).max(15).required(),
    pays: Joi.string().min(3).max(15).required(),
    sexe: Joi.string()
      .valid("Homme", "Femme")
      .required()
      .error(new BadRequestError("Sexe must be Homme or Femme")),
  });

  try {
    await profileSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default validateProfile;
