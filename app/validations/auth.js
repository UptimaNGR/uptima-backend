import Joi from '@hapi/joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email(),
  username: Joi.string().min(4),
  password: Joi.string().min(6)
    .required()
});

export default loginSchema;
