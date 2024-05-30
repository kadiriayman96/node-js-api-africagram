import Joi from "joi";

const validateUpdateUser = async (req, res, next) => {
  const updateSchema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
  });

  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default validateUpdateUser;
