import Joi from "joi";

const validateLogin = async (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default validateLogin;
