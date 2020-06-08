import Joi from '@hapi/joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email(),
  username: Joi.string(),
  password: Joi.string()
    .required()
});

export default loginSchema;
