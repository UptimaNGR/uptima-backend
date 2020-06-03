import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().min(4).required(),
  phone_number: Joi.string().required(),
  user_type: Joi.string().required(),
  company_id: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  middle_name: Joi.string(),
});

export default userSchema;
