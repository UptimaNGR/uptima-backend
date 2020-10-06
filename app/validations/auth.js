import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().min(4),
  password: Joi.string().min(6).required()
});

const updatePasswordEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

export { loginSchema, updatePasswordEmailSchema };
