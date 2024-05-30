import Joi from "joi";

const validateAime = async (req, res, next) => {
  const aimSchema = Joi.object({
    postId: Joi.number().integer().min(0).required(),
  });

  try {
    await aimSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.json({ error: error.details.map((detail) => detail.message) });
  }
};

export default validateAime;
