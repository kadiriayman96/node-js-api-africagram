import Joi from "joi";

const validateRegister = async (req, res, next) => {
  const registerSchema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default validateRegister;
