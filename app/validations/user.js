import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  username: Joi.string().min(4).required(),
  phoneNumber: Joi.string().min(10).required(),
  role: Joi.string().required(),
  companyId: Joi.string().required(),
  email: Joi.string().email().required(),
  middleName: Joi.string().min(1),
  facilityId: Joi.string()
});

export default userSchema;
