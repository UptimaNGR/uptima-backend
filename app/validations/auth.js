import Joi from '@hapi/joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
});

export default loginSchema;
