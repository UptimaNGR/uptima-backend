import Joi from '@hapi/joi';

const companySchema = Joi.object().keys({
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  companyName: Joi.string().required(),
  subscriptionType: Joi.string().required(),
  subscriptionStatus: Joi.string().required(),
  email: Joi.string().email().required()
});

export default companySchema;
